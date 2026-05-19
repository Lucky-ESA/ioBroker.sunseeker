"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var mqtt_exports = {};
__export(mqtt_exports, {
  mqttConnection: () => mqttConnection
});
module.exports = __toCommonJS(mqtt_exports);
var import_mqtt = __toESM(require("mqtt"));
var import_node_events = require("node:events");
var import_uuid = require("uuid");
class mqttConnection extends import_node_events.EventEmitter {
  mqttClient;
  type;
  iob;
  /**
   * MQTT Connection
   *
   * @param iob ioBroker.Adapter
   */
  constructor(iob) {
    super();
    this.type = "";
    this.iob = iob;
  }
  start(user_id, password, type, appId) {
    if (this.mqttClient) {
      this.mqttClient.end();
    }
    this.type = type;
    let host = "";
    let port = 1884;
    if (this.iob.config.region == "EU") {
      if (type == "V") {
        host = "app.mqttv1-eu.sk-robot.com";
      } else {
        host = "wfsmqtt-specific.sk-robot.com";
      }
    } else {
      if (type == "V") {
        host = "app.mqttv1-us.sk-robot.com";
      } else {
        host = "wfsmqtt-specific-us.sk-robot.com";
      }
    }
    if (type == "V") {
      port = 32884;
    }
    this.mqttClient = import_mqtt.default.connect(`mqtts://${host}`, {
      username: `${this.iob.config.username}${appId}`,
      password,
      clientId: `${(0, import_uuid.v4)()}new`,
      keepalive: 60,
      reconnectPeriod: 1e3,
      connectTimeout: 30 * 1e3,
      port,
      will: {
        topic: "None",
        payload: "None",
        qos: 0,
        retain: false
      }
    });
    this.mqttClient.on("connect", () => {
      this.iob.log.info("MQTT connected");
      void this.setStatesConnection(true);
      let ep = "wirelessdevice";
      if (type == "V") {
        ep = "wirelessmower";
      }
      this.mqttClient && this.mqttClient.subscribe(`/${ep}/${user_id}/get`, { qos: 0 });
      this.emit("status", true);
    });
    this.mqttClient.on("message", (topic, message) => {
      this.iob.log.debug(`MQTT message: ${topic} ${message.toString()}`);
      try {
        const data = JSON.parse(message.toString());
        void this.setStatesUpdate(data);
        this.emit("update", data);
      } catch (error) {
        this.iob.log.error(`MQTT message error: ${error.message}`);
        this.iob.log.error(`MQTT message: ${message.toString()}`);
      }
    });
    this.mqttClient.on("error", (error) => {
      this.iob.log.error(`MQTT error: ${error}`);
      void this.setStatesConnection(false);
      this.emit("status", false);
    });
    this.mqttClient.on("close", () => {
      this.iob.log.info("MQTT closed");
      void this.setStatesConnection(false);
      this.emit("status", false);
    });
    this.mqttClient.on("offline", () => {
      this.iob.log.info("MQTT offline");
      void this.setStatesConnection(false);
      this.emit("status", false);
    });
    this.mqttClient.on("reconnect", () => {
      this.iob.log.info("MQTT reconnect");
      void this.setStatesConnection(true);
      this.emit("status", true);
    });
  }
  startOld(user_id) {
    if (this.mqttClient) {
      this.mqttClient.end();
    }
    this.mqttClient = import_mqtt.default.connect("mqtt://mqtts.sk-robot.com", {
      username: "app",
      password: "h4ijwkTnyrA",
      clientId: (0, import_uuid.v4)(),
      keepalive: 60,
      reconnectPeriod: 1e3,
      connectTimeout: 30 * 1e3,
      will: {
        topic: "None",
        payload: "None",
        qos: 0,
        retain: false
      }
    });
    this.mqttClient.on("connect", () => {
      this.iob.log.info("MQTT connected");
      this.mqttClient && this.mqttClient.subscribe(`/app/${user_id}/get`, { qos: 0 });
    });
    this.mqttClient.on("message", (topic, message) => {
      this.iob.log.debug(`MQTT message: ${topic} ${message.toString()}`);
      try {
        const data = JSON.parse(message.toString());
        this.iob.log.debug(`Message: ${data}`);
      } catch (error) {
        this.iob.log.error(`MQTT message error: ${error.message}`);
        this.iob.log.error(`MQTT message: ${message.toString()}`);
      }
    });
    this.mqttClient.on("error", (error) => {
      this.iob.log.error(`MQTT error: ${error}`);
    });
    this.mqttClient.on("close", () => {
      this.iob.log.info("MQTT closed");
    });
    this.mqttClient.on("offline", () => {
      this.iob.log.info("MQTT offline");
    });
    this.mqttClient.on("reconnect", () => {
      this.iob.log.info("MQTT reconnect");
    });
  }
  async setStatesConnection(val) {
    if (this.type == "x") {
      await this.iob.setState(`mqtt.x_connection`, { val, ack: true });
    } else {
      await this.iob.setState(`mqtt.v_connection`, { val, ack: true });
    }
  }
  async setStatesUpdate(obj) {
    if (this.type == "x") {
      if (obj.timestamp) {
        await this.iob.setState(`mqtt.x_last_update`, { val: obj.timestamp, ack: true });
      }
    } else {
      if (obj.timestamp) {
        await this.iob.setState(`mqtt.v_last_update`, { val: obj.timestamp, ack: true });
      }
    }
  }
  /**
   * Destroy all events
   */
  destroy() {
    if (this.mqttClient) {
      this.mqttClient.end();
    }
    void this.setStatesConnection(false);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mqttConnection
});
//# sourceMappingURL=mqtt.js.map
