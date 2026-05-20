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
var statesX_exports = {};
__export(statesX_exports, {
  createStatesX: () => createStatesX
});
module.exports = __toCommonJS(statesX_exports);
class createStatesX {
  devices = /* @__PURE__ */ new Map();
  iob;
  /**
   * ioBroker Objects
   *
   * @param iob ioBroker.Adapter
   */
  constructor(iob) {
    this.iob = iob;
  }
  async setProperties(message) {
    if (message.deviceSn == null || message.data == null) {
      this.iob.log.error(`Missing message data!!!`);
      return;
    }
    const sn = message.deviceSn;
    const data = message.data;
    if (data.camera_temp != null) {
      await this.iob.setState(`${sn}.mower.camera_temp`, { val: data.camera_temp, ack: true });
    }
    if (data.soc_temp != null) {
      await this.iob.setState(`${sn}.mower.soc_temp`, { val: data.soc_temp, ack: true });
    }
    if (data.wifi_sig != null) {
      await this.iob.setState(`${sn}.mower.wifi_sig`, { val: data.wifi_sig, ack: true });
    }
    if (data.net_4g_sig != null) {
      await this.iob.setState(`${sn}.mower.net_4g_sig`, { val: data.net_4g_sig, ack: true });
    }
    if (data.robot_pos != null) {
      await this.iob.setState(`${sn}.mower.robot_pos_angle`, { val: data.robot_pos.angle, ack: true });
      await this.iob.setState(`${sn}.mower.robot_pos_x`, { val: data.robot_pos.point[0], ack: true });
      await this.iob.setState(`${sn}.mower.robot_pos_y`, { val: data.robot_pos.point[1], ack: true });
    }
  }
  async createUpdate(id, data) {
    if (typeof data === "object") {
      if (data.status) {
        await this.iob.setState(`${id}.mower.status`, { val: data.status, ack: true });
      }
    }
  }
  addDevice(id, model) {
    this.devices.set(id, model);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createStatesX
});
//# sourceMappingURL=statesX.js.map
