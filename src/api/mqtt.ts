import { EventEmitter } from "node:events";
import type { MQTT } from "../types/mqtt";

export class mqttConnection extends EventEmitter implements MQTT {
    private testTimeout: ioBroker.Timeout | undefined;
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

    public start(): void {
        this.iob.log.info("Work");
    }

    /**
     * Destroy all events
     */
    public destroy(): void {
        this.iob.log.info("Work");
    }
}
