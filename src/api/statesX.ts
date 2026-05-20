import type { States } from "../types/statesX";

export class createStatesX implements States {
    private devices: Map<string, string> = new Map<string, string>();
    private iob: ioBroker.Adapter;
    /**
     * ioBroker Objects
     *
     * @param iob ioBroker.Adapter
     */
    constructor(iob: ioBroker.Adapter) {
        this.iob = iob;
    }

    public async setProperties(message: any): Promise<any> {
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

    public async createUpdate(id: string, data: any): Promise<any> {
        if (typeof data === "object") {
            if (data.status) {
                await this.iob.setState(`${id}.mower.status`, { val: data.status, ack: true });
            }
        }
    }

    public addDevice(id: string, model: string): void {
        this.devices.set(id, model);
    }
}
