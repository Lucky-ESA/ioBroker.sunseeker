import mqtt from "mqtt";
import { EventEmitter } from "node:events";
import { v4 as uuidv4 } from "uuid";
import type { MQTT } from "../types/mqtt";

export class mqttConnection extends EventEmitter implements MQTT {
    private mqttClient: any;
    private type: string;
    private iob: ioBroker.Adapter;
    /**
     * MQTT Connection
     *
     * @param iob ioBroker.Adapter
     */
    constructor(iob: ioBroker.Adapter) {
        super();
        this.type = "";
        this.iob = iob;
    }

    public start(user_id: number, password: string, type: string, appId: string): void {
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
        this.mqttClient = mqtt.connect(`mqtts://${host}`, {
            username: `${this.iob.config.username}${appId}`,
            password: password,
            clientId: `${uuidv4()}new`,
            keepalive: 60,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            port: port,
            will: {
                topic: "None",
                payload: "None",
                qos: 0,
                retain: false,
            },
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
        this.mqttClient.on("message", (topic: string, message: { toString: () => string }) => {
            this.iob.log.debug(`MQTT message: ${topic} ${message.toString()}`);
            try {
                const data = JSON.parse(message.toString());
                void this.setStatesUpdate(data);
                this.emit("update", data);
            } catch (error) {
                this.iob.log.error(`MQTT message error: ${(error as Error).message}`);
                this.iob.log.error(`MQTT message: ${message.toString()}`);
            }
        });
        this.mqttClient.on("error", (error: string) => {
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

    public startOld(user_id: number): void {
        if (this.mqttClient) {
            this.mqttClient.end();
        }
        this.mqttClient = mqtt.connect("mqtt://mqtts.sk-robot.com", {
            username: "app",
            password: "h4ijwkTnyrA",
            clientId: uuidv4(),
            keepalive: 60,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
            will: {
                topic: "None",
                payload: "None",
                qos: 0,
                retain: false,
            },
        });
        this.mqttClient.on("connect", () => {
            this.iob.log.info("MQTT connected");
            this.mqttClient && this.mqttClient.subscribe(`/app/${user_id}/get`, { qos: 0 });
        });
        this.mqttClient.on("message", (topic: string, message: { toString: () => string }) => {
            this.iob.log.debug(`MQTT message: ${topic} ${message.toString()}`);
            try {
                const data = JSON.parse(message.toString());
                this.iob.log.debug(`Message: ${data}`);
            } catch (error) {
                this.iob.log.error(`MQTT message error: ${(error as Error).message}`);
                this.iob.log.error(`MQTT message: ${message.toString()}`);
            }
        });
        this.mqttClient.on("error", (error: string) => {
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

    private async setStatesConnection(val: boolean): Promise<void> {
        if (this.type == "x") {
            await this.iob.setState(`mqtt.x_connection`, { val: val, ack: true });
        } else {
            await this.iob.setState(`mqtt.v_connection`, { val: val, ack: true });
        }
    }

    private async setStatesUpdate(obj: any): Promise<void> {
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
    public destroy(): void {
        if (this.mqttClient) {
            this.mqttClient.end();
        }
        void this.setStatesConnection(false);
    }
}
