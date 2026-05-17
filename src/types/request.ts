export interface AxiosRrequest {
    /**
     * @param url Icon URL
     * @param header Icon URL
     * @param options Options
     * @returns axios response
     */
    get(url: string, header: any, options: any): Promise<AxiosResponse>;
    /**
     * @param url Icon URL
     * @param header Icon URL
     * @param options Options
     * @returns axios response
     */
    post(url: string, header: any, options: any): Promise<AxiosResponse>;
}

export interface AxiosResponse<T = any> {
    data: T;
    message: string;
    status: boolean;
}
