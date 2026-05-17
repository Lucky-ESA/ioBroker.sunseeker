import mqtt from "mqtt";
import { EventEmitter } from "node:events";
import { v4 as uuidv4 } from "uuid";
import type { MQTT } from "../types/mqtt";

export class mqttConnection extends EventEmitter implements MQTT {
    private mqttClient: any;
    private readonly iob: ioBroker.Adapter;
    /**
     * MQTT Connection
     *
     * @param iob ioBroker.Adapter
     */
    constructor(iob: ioBroker.Adapter) {
        super();
        this.iob = iob;
    }

    public start(user_id: number): void {
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

    /**
     * Destroy all events
     */
    public destroy(): void {
        if (this.mqttClient) {
            this.mqttClient.end();
        }
    }
}
