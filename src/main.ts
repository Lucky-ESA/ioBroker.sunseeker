/*
 * Created with @iobroker/create-adapter v3.1.5
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
import * as utils from "@iobroker/adapter-core";
import Json2iob from "json2iob";
import * as helper from "./api/helper";
import { mqttConnection } from "./api/mqtt";
import { creatObjects } from "./api/objects";
import { axoisRrequest } from "./api/request";
import type { DevicesData, LoginHeader, LoginResponse, RequestHeader, RestartLimit } from "./types/types";

class Sunseeker extends utils.Adapter {
    private objects: creatObjects;
    private restartLimit: RestartLimit;
    private req: axoisRrequest;
    private json2iob: Json2iob;
    private lHeader: LoginHeader;
    private rHeader: RequestHeader;
    private url: string;
    private url_host: string;
    private lang: string;
    private session: LoginResponse | undefined;
    private refreshTokenInterval: ioBroker.Interval | undefined;
    private devices: Map<string, DevicesData> = new Map<string, DevicesData>();
    private mqtt: mqttConnection;
    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({
            ...options,
            name: "sunseeker",
        });
        this.on("ready", this.onReady.bind(this));
        this.on("stateChange", this.onStateChange.bind(this));
        // this.on("objectChange", this.onObjectChange.bind(this));
        // this.on("message", this.onMessage.bind(this));
        this.on("unload", this.onUnload.bind(this));
        this.objects = new creatObjects(this);
        this.json2iob = new Json2iob(this);
        this.req = new axoisRrequest();
        this.url = helper.EU_URI;
        this.url_host = helper.EU_HOST;
        this.refreshTokenInterval = undefined;
        this.session = undefined;
        this.lang = "de";
        this.mqtt = new mqttConnection(this);
        this.lHeader = {
            "Accept-Language": "de",
            Authorization: "Basic YXBwOmFwcA==",
            "Content-Type": "application/x-www-form-urlencoded",
            Connection: "Keep-Alive",
            "User-Agent": "okhttp/4.4.1",
        };
        this.rHeader = {
            "Content-Type": "application/json",
            "Accept-Language": "de",
            Authorization: "",
            Host: "wirefree-specific.sk-robot.com",
            Connection: "Keep-Alive",
            "User-Agent": "okhttp/4.4.1",
        };
        this.restartLimit = {
            restartCount: 0,
            restartLast: 0,
            restartTime: "",
            day: "01-01",
        };
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    private async onReady(): Promise<void> {
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
        const reqCount: ioBroker.State | null | undefined = await this.getStateAsync(`rateLimit.restart`);
        if (reqCount && reqCount.val != null && typeof reqCount.val === "string" && reqCount.val.startsWith("{")) {
            const infoCount = JSON.parse(reqCount.val);
            if (Object.keys(infoCount).length === 4) {
                this.log.debug(`Use old restartLimit data!`);
                this.restartLimit = infoCount;
            }
        }
        const diffTime = new Date().getTime() - this.restartLimit.restartLast;
        if (diffTime > 24 * 60 * 1000 * 60 || this.restartLimit.day != this.getWeek()) {
            this.restartLimit.restartCount = 0;
            this.restartLimit.restartLast = new Date().getTime();
            this.restartLimit.restartTime = new Date().toISOString();
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
            await this.getDeviceUpdate();
            this.setRefreshToken();
            this.subscribeStates("*");
            if (this.session && this.session.user_id) {
                //this.mqtt.start(this.session.user_id);
            }
        }
    }

    private setRefreshToken(): void {
        this.refreshTokenInterval && this.clearInterval(this.refreshTokenInterval);
        if (this.session) {
            this.refreshTokenInterval = this.setInterval(
                () => {
                    void this.refreshToken();
                },
                (this.session.expires_in || 345599) * 1000,
            );
        }
    }

    private async login(): Promise<boolean> {
        const headers = {
            headers: this.lHeader,
        };
        const data = {
            data: {
                username: this.config.username,
                password: this.config.password,
                grant_type: "password",
                scope: "server",
            },
        };
        const url = `${this.url}/auth/oauth/token`;
        const session: any = await this.req.post(url, headers, data);
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

    private async refreshToken(): Promise<void> {
        const headers = {
            headers: this.lHeader,
        };
        const url = `${this.url}/admin/new-oauth/oauth2-new/token?refresh_token=${this.session?.refresh_token}`;
        const resp: any = await this.req.post(url, headers, null);
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

    private async getDeviceList(): Promise<boolean> {
        const headers = {
            headers: this.rHeader,
        };
        const url = `${this.url}/app_wireless_mower/device-user/getCustomDevice?all=true`;
        const resp: any = await this.req.get(url, headers, null);
        if (resp && resp.data && resp.data.data) {
            this.log.debug(`getDeviceList: ${JSON.stringify(resp.data)}`);
            for (const device of resp.data.data) {
                if (!this.devices.get(device.deviceId)) {
                    this.log.info(`Create mower raw for device ${device.deviceId}`);
                    this.devices.set(device.deviceId, device);
                    await this.objects.createRaw(device.deviceId);
                }
                await this.json2iob.parse(`${device.deviceId}.mower_raw`, device, { forceIndex: true });
            }
            return true;
        } else if (resp && resp && resp.code) {
            this.log.error(`DeviceList Invalid: ${JSON.stringify(resp)}`);
        } else if (typeof resp === "object") {
            this.log.error(`DeviceList Error Data: ${JSON.stringify(resp)}`);
        } else {
            this.log.error(`DeviceList Error: ${resp}`);
        }
        return false;
    }

    private async getDeviceUpdate(): Promise<boolean> {
        const headers = {
            headers: this.rHeader,
        };
        for (const id of this.devices.keys()) {
            const url = `${this.url}/app_wireless_mower/device/info/${id}`;
            const resp: any = await this.req.get(url, headers, null);
            if (resp && resp.data && resp.data.data) {
                this.log.debug(`getDeviceUpdate: ${JSON.stringify(resp.data)}`);
                this.log.info(`Create mower raw info for device ${id}`);
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
    private onUnload(callback: () => void): void {
        try {
            this.refreshTokenInterval && this.clearInterval(this.refreshTokenInterval);
            this.mqtt.destroy();
            callback();
        } catch (error) {
            this.log.error(`Error during unloading: ${(error as Error).message}`);
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
    private onStateChange(id: string, state: ioBroker.State | null | undefined): void {
        if (state) {
            if (!state.ack) {
                const command = id.split(".").pop();
                if (command === "update") {
                    void this.getDeviceUpdate();
                    void this.setState(id, { ack: true });
                } else if (command === "update_raw") {
                    void this.getDeviceList();
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

    private async setRestartCount(): Promise<void> {
        await this.setState(`rateLimit.restart`, { val: JSON.stringify(this.restartLimit), ack: true });
    }

    private getWeek(): string {
        const target = new Date();
        const getDay = target.getDay();
        const dayNr = (target.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        const jan4 = new Date(target.getFullYear(), 0, 4);
        const dayDiff = (target.getTime() - jan4.getTime()) / 86400000;
        if (new Date(target.getFullYear(), 0, 1).getDay() < 5) {
            return `${1 + Math.ceil(dayDiff / 7)}-${getDay}`;
        }
        return `${Math.ceil(dayDiff / 7)}-${getDay}`;
    }

    private async setSessionValue(): Promise<void> {
        if (this.session) {
            this.session.next_token = new Date().getTime() + this.session.expires_in * 1000;
            this.session.next_refreshToken = new Date().getTime() + this.session.refresh_expires_in * 1000;
        }
        //await this.setState("auth.session", { val: this.encrypt(JSON.stringify(this.session)), ack: true });
        await this.setState("auth.session", { val: JSON.stringify(this.session), ack: true });
    }
}
if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new Sunseeker(options);
} else {
    // otherwise start the instance directly
    (() => new Sunseeker())();
}
