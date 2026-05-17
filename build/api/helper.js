"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var helper_exports = {};
__export(helper_exports, {
  CMDURL_V: () => CMDURL_V,
  CMDURL_X: () => CMDURL_X,
  EU_HOST: () => EU_HOST,
  EU_URI: () => EU_URI,
  MQTT_EU_NEW: () => MQTT_EU_NEW,
  MQTT_EU_OLD: () => MQTT_EU_OLD,
  MQTT_US_NEW: () => MQTT_US_NEW,
  MQTT_US_OLD: () => MQTT_US_OLD,
  OLD_HOST: () => OLD_HOST,
  OLD_URL: () => OLD_URL,
  US_HOST: () => US_HOST,
  US_URI: () => US_URI
});
module.exports = __toCommonJS(helper_exports);
const US_URI = "https://wirefree-specific-us.sk-robot.com/api";
const US_HOST = "wirefree-specific-us.sk-robot.com";
const EU_URI = "https://wirefree-specific.sk-robot.com/api";
const EU_HOST = "wirefree-specific.sk-robot.com";
const OLD_URL = "https://server.sk-robot.com/api";
const OLD_HOST = "server.sk-robot.com";
const CMDURL_X = "/iot_mower/wireless/device/";
const CMDURL_V = "/app_wirelessv1_mower/wirelessv1/device/";
const MQTT_EU_OLD = "app.mqttv1-eu.sk-robot.com";
const MQTT_EU_NEW = "wfsmqtt-specific.sk-robot.com";
const MQTT_US_OLD = "app.mqttv1-us.sk-robot.com";
const MQTT_US_NEW = "wfsmqtt-specific-us.sk-robot.com";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CMDURL_V,
  CMDURL_X,
  EU_HOST,
  EU_URI,
  MQTT_EU_NEW,
  MQTT_EU_OLD,
  MQTT_US_NEW,
  MQTT_US_OLD,
  OLD_HOST,
  OLD_URL,
  US_HOST,
  US_URI
});
//# sourceMappingURL=helper.js.map
