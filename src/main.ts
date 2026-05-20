/*
 * Created with @iobroker/create-adapter v3.1.5
 * Based on https://github.com/Sdahl1234/Sunseeker-lawn-mower
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
import * as utils from "@iobroker/adapter-core";
import Json2iob from "json2iob";
import forge from "node-forge";
import * as helper from "./api/helper";
import { mqttConnection } from "./api/mqtt";
import { createObjects } from "./api/objects";
import { axoisRrequest } from "./api/request";
import { createStatesV } from "./api/statesV";
import { createStatesX } from "./api/statesX";
import type { DevicesData, LoginHeader, LoginResponse, RequestHeader, RestartLimit } from "./types/types";

class Sunseeker extends utils.Adapter {
    private objects: createObjects;
    private statesX: createStatesX;
    private statesV: createStatesV;
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
    private deviceInterval: ioBroker.Interval | undefined;
    private deviceRawInterval: ioBroker.Interval | undefined;
    private devices: Map<string, DevicesData> = new Map<string, DevicesData>();
    private mqttV: mqttConnection;
    private mqttX: mqttConnection;
    private statusMqttX: boolean;
    private statusMqttV: boolean;
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
        this.objects = new createObjects(this);
        this.statesX = new createStatesX(this);
        this.statesV = new createStatesV(this);
        this.json2iob = new Json2iob(this);
        this.req = new axoisRrequest();
        this.url = helper.EU_URI;
        this.url_host = helper.EU_HOST;
        this.refreshTokenInterval = undefined;
        this.deviceRawInterval = undefined;
        this.deviceInterval = undefined;
        this.session = undefined;
        this.lang = "de";
        this.mqttV = new mqttConnection(this);
        this.mqttX = new mqttConnection(this);
        this.statusMqttX = false;
        this.statusMqttV = false;
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
        if (this.config.interval < 1 || this.config.interval > 1440) {
            this.log.info(`Set interval to 60 secondes`);
            this.config.interval = 60;
        }
        if (this.config.interval_raw < 1 || this.config.interval_raw > 24) {
            this.log.info(`Set interval raw data to 12 secondes`);
            this.config.interval_raw = 60;
        }
        await this.setState("info.connection", false, true);
        if (!this.config.username || !this.config.password) {
            this.log.error("Please set username and password in the instance settings");
            return;
        }
        const config = await this.getForeignObjectAsync("system.config");
        if (config && config.common && config.common.language) {
            this.lang = config.common.language === this.lang ? this.lang : "en";
        }
        if (!helper.LANG.includes(this.lang)) {
            this.lang = "en";
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
        this.log.info(`Create mqtt objects`);
        await this.objects.createMqtt();
        this.rHeader.Host = this.url_host;
        this.log.info(`Start login`);
        const session = await this.login();
        if (session) {
            await this.setState("info.connection", true, true);
            await this.getDeviceList();
            await this.getUpdateDevices(true);
            this.setRefreshToken();
            this.subscribeStates("*");
            this.startDeviceDataInterval();
            this.startDeviceRawDataInterval();
        }
    }

    private async getTesting(path: string): Promise<boolean> {
        const headers = {
            headers: this.rHeader,
        };
        const url = `${this.url}${path}`;
        const resp: any = await this.req.get(url, headers, null);
        if (resp && resp.data && resp.data.data) {
            this.log.debug(`getTesting: ${JSON.stringify(resp.data)}`);
        } else if (resp && resp && resp.code) {
            this.log.error(`getTesting Invalid: ${JSON.stringify(resp)}`);
        } else if (typeof resp === "object") {
            if (resp.data) {
                if (resp.data) {
                    this.log.error(`getTesting Error Data: ${JSON.stringify(resp.data)}`);
                } else {
                    this.log.error(`getTesting Error Data: ${JSON.stringify(resp)}`);
                }
            } else {
                this.log.error(`getTesting Error: ${JSON.stringify(resp)}`);
            }
        } else {
            this.log.error(`getTesting Error String: ${resp}`);
        }
        return true;
    }

    private async updateMqttPasswd(privat_key: string): Promise<boolean> {
        const headers = {
            headers: {
                Authorization: `bearer ${this.session?.access_token}`,
            },
        };
        const data = {
            data: {
                appIdCode: helper.appId,
                appType: 2,
                mqttsPassword: privat_key,
                operatingSystemCode: "android",
            },
        };
        const url = `${this.url}/admin/user/edit`;
        const resp: any = await this.req.put(url, headers, data);
        if (resp && resp.data && resp.data.data) {
            this.log.debug(`updateMqttPasswd: ${JSON.stringify(resp.data)}`);
        } else if (resp && resp && resp.code) {
            this.log.error(`updateMqttPasswd code: ${JSON.stringify(resp)}`);
        } else if (typeof resp === "object") {
            if (resp.data) {
                if (resp.data.code == 0 && resp.data.ok) {
                    this.log.info(`Set Password successfully`);
                } else {
                    this.log.error(`updateMqttPasswd Error Data: ${JSON.stringify(resp.data)}`);
                }
            } else {
                this.log.error(`updateMqttPasswd Error: ${JSON.stringify(resp)}`);
            }
        } else {
            this.log.error(`updateMqttPasswd Error String: ${resp}`);
        }
        return true;
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
            if (session.data) {
                this.log.error(`Login Error Data: ${JSON.stringify(session.data)}`);
            } else {
                this.log.error(`Login Error: ${JSON.stringify(session)}`);
            }
        } else {
            this.log.error(`Login Error String: ${session}`);
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
            if (resp.data) {
                this.log.error(`RefreshToken Error Data: ${JSON.stringify(resp.data)}`);
            } else {
                this.log.error(`RefreshToken Error: ${JSON.stringify(resp)}`);
            }
        } else {
            this.log.error(`RefreshToken String: ${resp}`);
        }
        await this.setState("info.connection", false, true);
    }

    private startDeviceDataInterval(): void {
        this.deviceInterval && this.clearInterval(this.deviceInterval);
        if (this.session) {
            this.deviceInterval = this.setInterval(
                async () => {
                    for (const id of this.devices.keys()) {
                        void this.getStartDataMqtt(
                            this.devices.get(id)?.deviceSn,
                            this.devices.get(id)?.model,
                            "getDevAllProperty",
                            "all",
                        );
                        if (this.devices.get(id)?.model == "X") {
                            void this.setProperties(
                                this.devices.get(id)?.deviceSn,
                                this.devices.get(id)?.model,
                                "getTimeTactics",
                                "time_custom",
                                "get_property",
                            );
                        } else {
                            const resp = await this.getDeviceData(
                                `${this.url}/app_wirelessv1_mower/wirelessv1/device-schedule/${id}`,
                                id,
                                "getDeviceMap",
                                null,
                                "mower map info",
                            );
                            if (resp) {
                                this.log.debug(JSON.stringify(resp));
                            }
                        }
                    }
                },
                this.config.interval * 60 * 1000,
            );
        }
    }

    private startDeviceRawDataInterval(): void {
        this.refreshTokenInterval && this.clearInterval(this.refreshTokenInterval);
        if (this.session) {
            this.refreshTokenInterval = this.setInterval(
                async () => {
                    await this.getDeviceList();
                    await this.getUpdateDevices(false);
                },
                this.config.interval_raw * 60 * 60 * 1000,
            );
        }
    }

    private async getDeviceList(): Promise<boolean> {
        const headers = {
            headers: this.rHeader,
        };
        const url = `${this.url}/app_wireless_mower/device-user/getCustomDevice?all=true`;
        const resp: any = await this.req.get(url, headers, null);
        let v = false;
        let x = false;
        if (resp && resp.data && resp.data.data) {
            this.log.debug(`getDeviceList: ${JSON.stringify(resp.data)}`);
            for (const device of resp.data.data) {
                if (!this.devices.get(device.deviceSn)) {
                    this.log.info(`Create mower raw for device ${device.deviceSn}`);
                    if (helper.V.includes(device.modelName.slice(0, 2))) {
                        device.model = "V";
                        device.first = true;
                        v = true;
                        this.statesV.addDevice(device.deviceSn, device.model);
                    } else if (helper.X.includes(device.modelName.slice(0, 2))) {
                        device.model = "X";
                        device.first = true;
                        x = true;
                        this.statesX.addDevice(device.deviceSn, device.model);
                    } else {
                        this.log.error(`Device ${device.modelName} is unknown. Create issue please.`);
                        continue;
                    }
                    this.devices.set(device.deviceSn, device);
                    await this.objects.createRaw(device.deviceSn, device.deviceName, device.model);
                    await this.objects.createMowerObjects(device.deviceSn, device.model);
                }
                await this.json2iob.parse(`${device.deviceSn}.mower_all_raw.mower_raw`, device, { forceIndex: true });
            }
            if (v) {
                this.log.info(`Initializing MQTT V connection`);
                if (this.session && this.session.user_id) {
                    const password_V = this.randomString(24);
                    const privatKey_V = this.rsa_base64(password_V);
                    this.log.debug(`V Password: ${password_V}`);
                    this.log.debug(`V PrivatKey: ${privatKey_V}`);
                    await this.updateMqttPasswd(privatKey_V);
                    this.mqttV.start(this.session.user_id, password_V, "v", helper.appId);
                    this.mqttV.on("update", this.getUpdateVData.bind(this));
                    this.mqttV.on("status", this.getStatusVConnection.bind(this));
                    const mqttData_V = {
                        pw: password_V,
                        key: privatKey_V,
                    };
                    await this.setState(`mqtt.v_access_data`, { val: JSON.stringify(mqttData_V), ack: true });
                }
            }
            if (x) {
                this.log.info(`Initializing MQTT X connection`);
                if (this.session && this.session.user_id) {
                    const password = this.randomString(24);
                    const privatKey = this.rsa_base64(password);
                    this.log.debug(`X Password: ${password}`);
                    this.log.debug(`X PrivatKey: ${privatKey}`);
                    await this.updateMqttPasswd(privatKey);
                    this.mqttV.start(this.session.user_id, password, "x", helper.appId);
                    this.mqttV.on("update", this.getUpdateXData.bind(this));
                    this.mqttV.on("status", this.getStatusXConnection.bind(this));
                    const mqttData = {
                        pw: password,
                        key: privatKey,
                    };
                    await this.setState(`mqtt.x_access_data`, { val: JSON.stringify(mqttData), ack: true });
                }
            }
            return true;
        } else if (resp && resp && resp.code) {
            this.log.error(`DeviceList Invalid: ${JSON.stringify(resp)}`);
        } else if (typeof resp === "object") {
            if (resp.data) {
                this.log.error(`DeviceList Error Data: ${JSON.stringify(resp.data)}`);
            } else {
                this.log.error(`DeviceList Error: ${JSON.stringify(resp)}`);
            }
        } else {
            this.log.error(`DeviceList Error String: ${resp}`);
        }
        return false;
    }

    private async getUpdateXData(message: any): Promise<void> {
        if (message) {
            if (message.deviceSn && message.data) {
                void this.statesX.createUpdate(message.deviceSn, message.data);
            }
            if (message.id == "getDevAllProperty") {
                if (this.devices.get(message.deviceSn)?.first) {
                    const val = this.devices.get(message.deviceSn);
                    if (val) {
                        val.first = false;
                        this.devices.set(message.deviceSn, val);
                    }
                    void this.objects.createMowerObject(message);
                } else {
                    void this.statesX.setProperties(message);
                }
                await this.json2iob.parse(`${message.deviceSn}.mower_properties`, message.data, { forceIndex: true });
            }
        }
    }

    private async getUpdateVData(message: any): Promise<void> {
        if (message) {
            if (message.deviceSn && message.data) {
                void this.statesV.createUpdate(message.deviceSn, message.data);
            }
            if (message.id == "getDevAllProperty") {
                if (this.devices.get(message.deviceSn)?.first) {
                    const val = this.devices.get(message.deviceSn);
                    if (val) {
                        val.first = false;
                        this.devices.set(message.deviceSn, val);
                    }
                    void this.objects.createMowerObject(message);
                } else {
                    void this.statesV.setProperties(message);
                }
                await this.json2iob.parse(`${message.deviceSn}.mower_properties`, message.data, { forceIndex: true });
            }
        }
    }

    private getStatusXConnection(message: boolean): void {
        this.statusMqttX = message;
        if (message) {
            for (const id of this.devices.keys()) {
                if (this.devices.get(id)?.model == "X" && this.devices.get(id)?.first) {
                    void this.getStartDataMqtt(
                        this.devices.get(id)?.deviceSn,
                        this.devices.get(id)?.model,
                        "getDevAllProperty",
                        "all",
                    );
                }
            }
        }
    }

    private getStatusVConnection(message: boolean): void {
        this.statusMqttV = message;
        if (message) {
            for (const id of this.devices.keys()) {
                if (this.devices.get(id)?.model == "V" && this.devices.get(id)?.first) {
                    void this.getStartDataMqtt(
                        this.devices.get(id)?.deviceSn,
                        this.devices.get(id)?.model,
                        "getDevAllProperty",
                        "all",
                    );
                }
            }
        }
    }

    private async getUpdateDevices(start: boolean): Promise<boolean> {
        for (const id of this.devices.keys()) {
            const deviceId = this.devices.get(id)?.deviceId;
            await this.getDeviceData(
                `${this.url}/wireless_map/wireless_device/get?deviceSn=${id}`,
                id,
                "getDeviceMap",
                "mower_all_raw.mower_map_info",
                "mower map info",
            );
            await this.getDeviceData(
                `${this.url}/wireless_map/wireless_device/getHeatMap?deviceSn=${id}`,
                id,
                "getDeviceHeadMap",
                "mower_all_raw.mower_head_map_info",
                "mower head map info",
            );
            await this.getDeviceData(
                `${this.url}/wireless_map/backup_map/get?sn=${id}`,
                id,
                "getDeviceBackupMap",
                "mower_all_raw.mower_backup_map_info",
                "mower backup map info",
            );
            if (this.devices.get(id)?.model == "V") {
                await this.getDeviceData(
                    `${this.url}/app_wirelessv1_mower/wirelessv1/device-schedule/${deviceId}`,
                    id,
                    "getDeviceSchedule",
                    "mower_all_raw.mower_schedule",
                    "mower schedule",
                );
            }
            const data = await this.getDeviceData(
                `${this.url}/app_wireless_mower/device/info/${deviceId}`,
                id,
                "getDeviceUpdate",
                "mower_all_raw.mower_raw_info",
                "update",
            );
            if (start && data && data.deviceSn) {
                //await this.objects.createMowerObjects(id, "X");
            }
            await this.getDeviceData(
                `${this.url}/app_wireless_mower/device/getBysn?sn=${id}`,
                id,
                "getDeviceUpdate_sn",
                "mower_all_raw.mower_raw_info_sn",
                "update sn",
            );
            if (start && data && data.deviceSn) {
                //await this.objects.createMowerObjects(id, "X");
            }
            await this.getDeviceData(
                `${this.url}/app_wireless_mower/work_record/page?sn=${id}&current=1&size=10`,
                id,
                "getDeviceWorkRecord",
                "mower_all_raw.mower_work_record",
                "work record",
            );
        }
        return true;
    }
    private async getDeviceData(
        url: string,
        id: string,
        log: string,
        path: string | null,
        create: string,
    ): Promise<any> {
        const headers = {
            headers: this.rHeader,
        };
        this.log.debug(`URL: ${url}`);
        const resp: any = await this.req.get(url, headers, null);
        if (resp && resp.data && resp.data.data) {
            this.log.debug(`${log}: ${JSON.stringify(resp.data)}`);
            this.log.info(`Create ${create} for device ${id}`);
            if (path != null) {
                await this.json2iob.parse(`${id}.${path}`, resp.data.data, { forceIndex: true });
            }
            return resp.data;
        } else if (resp && resp && resp.code) {
            this.log.error(`${log} Invalid: ${JSON.stringify(resp)}`);
        } else if (typeof resp === "object") {
            if (resp.data) {
                this.log.error(`${log} Error Data: ${JSON.stringify(resp.data)}`);
            } else {
                this.log.error(`${log} Error: ${JSON.stringify(resp)}`);
            }
        } else {
            this.log.error(`${log} Error String: ${resp}`);
        }
        return true;
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
                this.log.info(`Create update for device ${id}`);
                await this.json2iob.parse(`${id}.mower_all_raw.mower_raw_info`, resp.data.data, { forceIndex: true });
            } else if (resp && resp && resp.code) {
                this.log.error(`getDeviceUpdate Invalid: ${JSON.stringify(resp)}`);
            } else if (typeof resp === "object") {
                if (resp.data) {
                    this.log.error(`getDeviceUpdate Error Data: ${JSON.stringify(resp.data)}`);
                } else {
                    this.log.error(`getDeviceUpdate Error: ${JSON.stringify(resp)}`);
                }
            } else {
                this.log.error(`DeviceData Error String: ${resp}`);
            }
        }
        return true;
    }

    private async getStartDataMqtt(
        deviceSN: string | undefined,
        model: string | undefined,
        id: string,
        key: string,
    ): Promise<boolean> {
        if (deviceSN == undefined || model == undefined) {
            this.log.error(`Param deviceSN or model is undefined!!!`);
            return false;
        }
        const data = {
            data: {
                appId: this.session?.user_id,
                deviceSn: deviceSN,
                id: id,
                key: key,
                method: "get_property",
            },
        };
        let path = helper.CMDURL_X;
        if (model == "V") {
            path = helper.CMDURL_V;
        }
        const headers = {
            headers: {
                Authorization: `bearer ${this.session?.access_token}`,
                "Content-Type": "application/json",
                Connection: "Keep-Alive",
            },
        };
        const url = `${this.url}${path}get_property`;
        const resp: any = await this.req.post(url, headers, data);
        if (resp && resp.data && resp.data.data) {
            this.log.debug(`getStartDataMqtt: ${JSON.stringify(resp.data)}`);
        } else if (resp && resp && resp.code) {
            this.log.error(`getStartDataMqtt Invalid: ${JSON.stringify(resp)}`);
        } else if (typeof resp === "object") {
            if (resp.data) {
                if (resp.data.code == 0 && resp.data.ok) {
                    this.log.info(`getStartDataMqtt Request OK`);
                } else {
                    this.log.error(`getStartDataMqtt Error Data: ${JSON.stringify(resp.data)}`);
                }
            } else {
                this.log.error(`getStartDataMqtt Error: ${JSON.stringify(resp)}`);
            }
        } else {
            this.log.error(`getStartDataMqtt Error String: ${resp}`);
        }
        return true;
    }

    private async setProperties(
        deviceSN: string | undefined,
        model: string | undefined,
        id: string,
        key: string,
        methode: string,
    ): Promise<boolean> {
        if (deviceSN == undefined || model == undefined) {
            this.log.error(`Param deviceSN or model is undefined!!!`);
            return false;
        }
        const data = {
            data: {
                appId: this.session?.user_id,
                deviceSn: deviceSN,
                id: id,
                key: key,
                method: methode,
            },
        };
        let path = helper.CMDURL_X;
        let cmd = "set_property";
        if (model == "V") {
            path = helper.CMDURL_V;
            cmd = "setProperty";
        }
        const headers = {
            headers: this.rHeader,
        };
        const url = `${this.url}${path}${cmd}`;
        const resp: any = await this.req.post(url, headers, data);
        if (resp && resp.data && resp.data.data) {
            this.log.debug(`setProperties: ${JSON.stringify(resp.data)}`);
        } else if (resp && resp && resp.code) {
            this.log.error(`getStartDataMqtt Invalid: ${JSON.stringify(resp)}`);
        } else if (typeof resp === "object") {
            if (resp.data) {
                if (resp.data.code == 0 && resp.data.ok) {
                    this.log.info(`setProperties Request OK`);
                } else {
                    this.log.error(`setProperties Error Data: ${JSON.stringify(resp.data)}`);
                }
            } else {
                this.log.error(`setProperties Error: ${JSON.stringify(resp)}`);
            }
        } else {
            this.log.error(`setProperties Error String: ${resp}`);
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
            this.deviceRawInterval && this.clearInterval(this.deviceRawInterval);
            this.deviceInterval && this.clearInterval(this.deviceInterval);
            this.mqttV.destroy();
            this.mqttX.destroy();
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
                const deviceSn = id.split(".")[2];
                const command = id.split(".").pop();
                this.log.debug(deviceSn);
                if (deviceSn == null || this.devices.get(deviceSn) == null) {
                    this.log.error(`Cannot found device ${id}`);
                    return;
                }
                switch (command) {
                    case "update":
                        void this.getDeviceUpdate();
                        void this.setState(id, { ack: true });
                        break;
                    case "update_raw":
                        void this.getDeviceList();
                        void this.setState(id, { ack: true });
                        break;
                    case "update_all":
                        void this.getUpdateDevices(false);
                        void this.setState(id, { ack: true });
                        break;
                    case "all_properties":
                        void this.getStartDataMqtt(
                            deviceSn,
                            this.devices.get(deviceSn)?.model,
                            "getDevAllProperty",
                            "all",
                        );
                        void this.setState(id, { ack: true });
                        break;
                    case "reportProperty":
                        void this.getStartDataMqtt(
                            deviceSn,
                            this.devices.get(deviceSn)?.model,
                            "report_property",
                            "all",
                        );
                        void this.setState(id, { ack: true });
                        break;
                    case "getRegionId":
                        void this.getStartDataMqtt(
                            deviceSn,
                            this.devices.get(deviceSn)?.model,
                            "getSelectRegionID",
                            "select_region_id",
                        );
                        void this.setState(id, { ack: true });
                        break;
                    case "getOwnRequest":
                        if (typeof state.val === "string") {
                            void this.getTesting(state.val);
                            void this.setState(id, { ack: true });
                        }
                        break;
                    case "getScheduleData":
                        void this.setProperties(
                            deviceSn,
                            this.devices.get(deviceSn)?.model,
                            "getTimeTactics",
                            "time_custom",
                            "get_property",
                        );
                        void this.setState(id, { ack: true });
                        break;
                    default:
                        this.log.warn(`Cannot found command ${command}`);
                        return;
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

    private randomString(length: number): string {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    private rsa_base64(text: string): string {
        const publicKey = forge.pki.publicKeyFromPem(helper.public_key);
        const encrypted = publicKey.encrypt(text);
        return forge.util.encode64(encrypted);
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
