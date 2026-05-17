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
  iob;
  /**
   * MQTT Connection
   *
   * @param iob ioBroker.Adapter
   */
  constructor(iob) {
    super();
    this.iob = iob;
  }
  start(user_id) {
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
  /**
   * Destroy all events
   */
  destroy() {
    if (this.mqttClient) {
      this.mqttClient.end();
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mqttConnection
});
//# sourceMappingURL=mqtt.js.map
