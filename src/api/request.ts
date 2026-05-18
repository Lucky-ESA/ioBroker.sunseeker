import { default as axios, AxiosError } from "axios";
import * as https from "node:https";
import type { AxiosResponse, AxiosRrequest } from "../types/request";

/**
 * Axios Handler
 */
export class axoisRrequest implements AxiosRrequest {
    private requestClient: any;

    /**
     * Axios Handler
     */
    constructor() {
        this.requestClient = axios.create({
            timeout: 10000,
            withCredentials: true,
            maxBodyLength: Infinity,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            }),
        });
    }

    /**
     * @param url Icon URL
     * @param header Icon URL
     * @param options Options
     * @returns axios response
     */
    public async get(url: string, header: any, options: any): Promise<AxiosResponse> {
        return await this.requestClient({
            method: "GET",
            url: url,
            ...header,
            ...options,
        })
            .then((res: AxiosResponse) => {
                return res;
            })
            .catch((err: any) => {
                let error = "";
                if (err instanceof AxiosError) {
                    error = err.response ? err.response.data : "Server Unavailable";
                } else if (err instanceof Error) {
                    error = err.message;
                }
                return error;
            });
    }

    /**
     * @param url Icon URL
     * @param header Icon URL
     * @param options Options
     * @returns axios response
     */
    public async post(url: string, header: any, options: any): Promise<AxiosResponse> {
        return await this.requestClient({
            method: "POST",
            url: url,
            ...header,
            ...options,
        })
            .then((res: AxiosResponse) => {
                return res;
            })
            .catch((err: any) => {
                let error = "";
                if (err instanceof AxiosError) {
                    error = err.response ? err.response.data : "Server Unavailable";
                } else if (err instanceof Error) {
                    error = err.message;
                }
                return error;
            });
    }

    /**
     * @param url Icon URL
     * @param header Icon URL
     * @param options Options
     * @returns axios response
     */
    public async put(url: string, header: any, options: any): Promise<AxiosResponse> {
        return await this.requestClient({
            method: "PUT",
            url: url,
            ...header,
            ...options,
        })
            .then((res: AxiosResponse) => {
                return res;
            })
            .catch((err: any) => {
                let error = "";
                if (err instanceof AxiosError) {
                    error = err.response ? err.response.data : "Server Unavailable";
                } else if (err instanceof Error) {
                    error = err.message;
                }
                return error;
            });
    }
}
