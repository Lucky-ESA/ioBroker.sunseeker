export interface MQTT {
    start(user_id: number, password: string, type: string, appId: string): void;
    startOld(user_id: number): void;
    destroy(): void;
}
