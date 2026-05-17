"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var utils = __toESM(require("@iobroker/adapter-core"));
var import_json2iob = __toESM(require("json2iob"));
var helper = __toESM(require("./api/helper"));
var import_mqtt = require("./api/mqtt");
var import_objects = require("./api/objects");
var import_request = require("./api/request");
class Sunseeker extends utils.Adapter {
  objects;
  restartLimit;
  req;
  json2iob;
  lHeader;
  rHeader;
  url;
  url_host;
  lang;
  session;
  refreshTokenInterval;
  devices = /* @__PURE__ */ new Map();
  mqtt;
  constructor(options = {}) {
    super({
      ...options,
      name: "sunseeker"
    });
    this.on("ready", this.onReady.bind(this));
    this.on("stateChange", this.onStateChange.bind(this));
    this.on("unload", this.onUnload.bind(this));
    this.objects = new import_objects.creatObjects(this);
    this.json2iob = new import_json2iob.default(this);
    this.req = new import_request.axoisRrequest();
    this.url = helper.EU_URI;
    this.url_host = helper.EU_HOST;
    this.refreshTokenInterval = void 0;
    this.session = void 0;
    this.lang = "de";
    this.mqtt = new import_mqtt.mqttConnection(this);
    this.lHeader = {
      "Accept-Language": "de",
      Authorization: "Basic YXBwOmFwcA==",
      "Content-Type": "application/x-www-form-urlencoded",
      Connection: "Keep-Alive",
      "User-Agent": "okhttp/4.4.1"
    };
    this.rHeader = {
      "Content-Type": "application/json",
      "Accept-Language": "de",
      Authorization: "",
      Host: "wirefree-specific.sk-robot.com",
      Connection: "Keep-Alive",
      "User-Agent": "okhttp/4.4.1"
    };
    this.restartLimit = {
      restartCount: 0,
      restartLast: 0,
      restartTime: "",
      day: "01-01"
    };
  }
  /**
   * Is called when databases are connected and adapter received configuration.
   */
  async onReady() {
    await this.setState("info.connection", false, true);
    if (!this.config.username || !this.config.password) {
      this.log.error("Please set username and password in the instance settings");
      return;
    }
    const config = await this.getForeignObjectAsync("system.config");
    if (config && config.common && config.common.language) {
      this.lang = config.common.language === this.lang ? this.lang : "en";
    }
    this.lHeader["Accept-Language"] = this.lang;
    this.rHeader["Accept-Language"] = this.lang;
    await this.objects.createAuth();
    const reqCount = await this.getStateAsync(`rateLimit.restart`);
    if (reqCount && reqCount.val != null && typeof reqCount.val === "string" && reqCount.val.startsWith("{")) {
      const infoCount = JSON.parse(reqCount.val);
      if (Object.keys(infoCount).length === 4) {
        this.log.debug(`Use old restartLimit data!`);
        this.restartLimit = infoCount;
      }
    }
    const diffTime = (/* @__PURE__ */ new Date()).getTime() - this.restartLimit.restartLast;
    if (diffTime > 24 * 60 * 1e3 * 60 || this.restartLimit.day != this.getWeek()) {
      this.restartLimit.restartCount = 0;
      this.restartLimit.restartLast = (/* @__PURE__ */ new Date()).getTime();
      this.restartLimit.restartTime = (/* @__PURE__ */ new Date()).toISOString();
      this.restartLimit.day = this.getWeek();
    }
    if (this.restartLimit.restartCount > 10) {
      this.log.warn(`The restart limit of 10 per day has been reached.`);
      return;
    }
    ++this.restartLimit.restartCount;
    await this.setRestartCount();
    if (this.config.region === "US") {
      this.url = helper.US_URI;
      this.url_host = helper.US_HOST;
    }
    this.rHeader.Host = this.url_host;
    this.log.info(`Start login`);
    const session = await this.login();
    if (session) {
      await this.setState("info.connection", true, true);
      await this.getDeviceList();
      await this.getUpdateDevices();
      this.setRefreshToken();
      this.subscribeStates("*");
      if (this.session && this.session.user_id) {
      }
    }
  }
  setRefreshToken() {
    this.refreshTokenInterval && this.clearInterval(this.refreshTokenInterval);
    if (this.session) {
      this.refreshTokenInterval = this.setInterval(
        () => {
          void this.refreshToken();
        },
        (this.session.expires_in || 345599) * 1e3
      );
    }
  }
  async login() {
    const headers = {
      headers: this.lHeader
    };
    const data = {
      data: {
        username: this.config.username,
        password: this.config.password,
        grant_type: "password",
        scope: "server"
      }
    };
    const url = `${this.url}/auth/oauth/token`;
    const session = await this.req.post(url, headers, data);
    if (session && session.data && session.data.access_token) {
      this.log.info(`Login successfully`);
      this.session = session.data;
      this.rHeader.Authorization = `bearer ${session.data.access_token}`;
      await this.setSessionValue();
      return true;
    } else if (session && session.code) {
      this.log.error(`Login Invalid: ${JSON.stringify(session)}`);
    } else if (typeof session === "object") {
      this.log.error(`Login Error Data: ${JSON.stringify(session)}`);
    } else {
      this.log.error(`Login Error: ${session}`);
    }
    return false;
  }
  async refreshToken() {
    var _a;
    const headers = {
      headers: this.lHeader
    };
    const url = `${this.url}/admin/new-oauth/oauth2-new/token?refresh_token=${(_a = this.session) == null ? void 0 : _a.refresh_token}`;
    const resp = await this.req.post(url, headers, null);
    if (resp && resp.data && resp.data.data) {
      await this.setState("info.connection", true, true);
      this.session = resp.data;
      this.lHeader.Authorization = `bearer ${resp.data.access_token}`;
      await this.setSessionValue();
      this.setRefreshToken();
      return;
    } else if (resp && resp && resp.code) {
      this.log.error(`RefreshToken Invalid: ${JSON.stringify(resp)}`);
    } else if (typeof resp === "object") {
      this.log.error(`RefreshToken Error Data: ${JSON.stringify(resp)}`);
    } else {
      this.log.error(`RefreshToken Error: ${resp}`);
    }
    await this.setState("info.connection", false, true);
  }
  async getDeviceList() {
    const headers = {
      headers: this.rHeader
    };
    const url = `${this.url}/app_wireless_mower/device-user/getCustomDevice?all=true`;
    const resp = await this.req.get(url, headers, null);
    if (resp && resp.data && resp.data.data) {
      this.log.debug(`getDeviceList: ${JSON.stringify(resp.data)}`);
      for (const device of resp.data.data) {
        if (!this.devices.get(device.deviceId)) {
          this.log.info(`Create mower raw for device ${device.deviceId}`);
          this.devices.set(device.deviceId, device);
          await this.objects.createRaw(device.deviceId, device.deviceName);
        }
        await this.json2iob.parse(`${device.deviceId}.mower_raw`, device, { forceIndex: true });
      }
      return true;
    } else if (resp && resp && resp.code) {
      this.log.error(`DeviceList Invalid: ${JSON.stringify(resp)}`);
    } else if (typeof resp === "object") {
      if (resp.data) {
        this.log.error(`DeviceList Error Data: ${JSON.stringify(resp.data)}`);
      } else {
        this.log.error(`DeviceList Error Data: ${JSON.stringify(resp)}`);
      }
    } else {
      this.log.error(`DeviceList Error: ${resp}`);
    }
    return false;
  }
  async getUpdateDevices() {
    var _a, _b, _c, _d;
    for (const id of this.devices.keys()) {
      await this.getDeviceData(
        `${this.url}/wireless_map/wireless_device/get?deviceSn=${(_a = this.devices.get(id)) == null ? void 0 : _a.deviceSn}`,
        id,
        "getDeviceMap",
        "mower_map_info",
        "mower map info"
      );
      await this.getDeviceData(
        `${this.url}/wireless_map/wireless_device/getHeatMap?deviceSn=${(_b = this.devices.get(id)) == null ? void 0 : _b.deviceSn}`,
        id,
        "getDeviceHeadMap",
        "mower_head_map_info",
        "mower head map info"
      );
      await this.getDeviceData(
        `${this.url}/wireless_map/backup_map/get?sn=${(_c = this.devices.get(id)) == null ? void 0 : _c.deviceSn}`,
        id,
        "getDeviceBackupMap",
        "mower_backup_map_info",
        "mower backup map info"
      );
      await this.getDeviceData(
        `${this.url}/app_wirelessv1_mower/wirelessv1/device-schedule/${id}`,
        id,
        "getDeviceSchedule",
        "mower_schedule",
        "mower schedule"
      );
      await this.getDeviceData(
        `${this.url}/app_wireless_mower/device/info/${id}`,
        id,
        "getDeviceUpdate",
        "mower_raw_info",
        "update"
      );
      await this.getDeviceData(
        `${this.url}/app_wireless_mower/work_record/page?sn=${(_d = this.devices.get(id)) == null ? void 0 : _d.deviceSn}&current=1&size=10`,
        id,
        "getDeviceWorkRecord",
        "mower_work_record",
        "work record"
      );
    }
    return true;
  }
  async getDeviceData(url, id, log, path, create) {
    const headers = {
      headers: this.rHeader
    };
    this.log.debug(`URL: ${url}`);
    const resp = await this.req.get(url, headers, null);
    if (resp && resp.data && resp.data.data) {
      this.log.debug(`${log}: ${JSON.stringify(resp.data)}`);
      this.log.info(`Create ${create} for device ${id}`);
      await this.json2iob.parse(`${id}.${path}`, resp.data.data, { forceIndex: true });
    } else if (resp && resp && resp.code) {
      this.log.error(`${log} Invalid: ${JSON.stringify(resp)}`);
    } else if (typeof resp === "object") {
      if (resp.data) {
        this.log.error(`${log} Error Data: ${JSON.stringify(resp.data)}`);
      } else {
        this.log.error(`${log} Error Data: ${JSON.stringify(resp)}`);
      }
    } else {
      this.log.error(`${log} Error: ${resp}`);
    }
    return true;
  }
  async getDeviceUpdate() {
    const headers = {
      headers: this.rHeader
    };
    for (const id of this.devices.keys()) {
      const url = `${this.url}/app_wireless_mower/device/info/${id}`;
      const resp = await this.req.get(url, headers, null);
      if (resp && resp.data && resp.data.data) {
        this.log.debug(`getDeviceUpdate: ${JSON.stringify(resp.data)}`);
        this.log.info(`Create update for device ${id}`);
        await this.json2iob.parse(`${id}.mower_raw_info`, resp.data.data, { forceIndex: true });
      } else if (resp && resp && resp.code) {
        this.log.error(`DeviceData Invalid: ${JSON.stringify(resp)}`);
      } else if (typeof resp === "object") {
        this.log.error(`DeviceData Error Data: ${JSON.stringify(resp)}`);
      } else {
        this.log.error(`DeviceData Error: ${resp}`);
      }
    }
    return true;
  }
  /**
   * Is called when adapter shuts down - callback has to be called under any circumstances!
   *
   * @param callback - Callback function
   */
  onUnload(callback) {
    try {
      this.refreshTokenInterval && this.clearInterval(this.refreshTokenInterval);
      this.mqtt.destroy();
      callback();
    } catch (error) {
      this.log.error(`Error during unloading: ${error.message}`);
      callback();
    }
  }
  // If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
  // You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
  // /**
  //  * Is called if a subscribed object changes
  //  */
  // private onObjectChange(id: string, obj: ioBroker.Object | null | undefined): void {
  //     if (obj) {
  //         // The object was changed
  //         this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
  //     } else {
  //         // The object was deleted
  //         this.log.info(`object ${id} deleted`);
  //     }
  // }
  /**
   * Is called if a subscribed state changes
   *
   * @param id - State ID
   * @param state - State object
   */
  onStateChange(id, state) {
    if (state) {
      if (!state.ack) {
        const command = id.split(".").pop();
        if (command === "update") {
          void this.getDeviceUpdate();
          void this.setState(id, { ack: true });
        } else if (command === "update_raw") {
          void this.getDeviceList();
          void this.setState(id, { ack: true });
        } else if (command === "update_all") {
          void this.getUpdateDevices();
          void this.setState(id, { ack: true });
        }
      }
    }
  }
  // If you need to accept messages in your adapter, uncomment the following block and the corresponding line in the constructor.
  // /**
  //  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
  //  * Using this method requires "common.messagebox" property to be set to true in io-package.json
  //  */
  //
  // private onMessage(obj: ioBroker.Message): void {
  //     if (typeof obj === "object" && obj.message) {
  //         if (obj.command === "send") {
  //             // e.g. send email or pushover or whatever
  //             this.log.info("send command");
  //             // Send response in callback if required
  //             if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
  //         }
  //     }
  // }
  async setRestartCount() {
    await this.setState(`rateLimit.restart`, { val: JSON.stringify(this.restartLimit), ack: true });
  }
  getWeek() {
    const target = /* @__PURE__ */ new Date();
    const getDay = target.getDay();
    const dayNr = (target.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const jan4 = new Date(target.getFullYear(), 0, 4);
    const dayDiff = (target.getTime() - jan4.getTime()) / 864e5;
    if (new Date(target.getFullYear(), 0, 1).getDay() < 5) {
      return `${1 + Math.ceil(dayDiff / 7)}-${getDay}`;
    }
    return `${Math.ceil(dayDiff / 7)}-${getDay}`;
  }
  async setSessionValue() {
    if (this.session) {
      this.session.next_token = (/* @__PURE__ */ new Date()).getTime() + this.session.expires_in * 1e3;
      this.session.next_refreshToken = (/* @__PURE__ */ new Date()).getTime() + this.session.refresh_expires_in * 1e3;
    }
    await this.setState("auth.session", { val: JSON.stringify(this.session), ack: true });
  }
}
if (require.main !== module) {
  module.exports = (options) => new Sunseeker(options);
} else {
  (() => new Sunseeker())();
}
//# sourceMappingURL=main.js.map
