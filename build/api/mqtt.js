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
var mqtt_exports = {};
__export(mqtt_exports, {
  mqttConnection: () => mqttConnection
});
module.exports = __toCommonJS(mqtt_exports);
var import_node_events = require("node:events");
class mqttConnection extends import_node_events.EventEmitter {
  testTimeout;
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
  start() {
    this.iob.log.info("Work");
  }
  /**
   * Destroy all events
   */
  destroy() {
    this.iob.log.info("Work");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mqttConnection
});
//# sourceMappingURL=mqtt.js.map
