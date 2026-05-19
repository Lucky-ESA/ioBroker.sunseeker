export interface States {
    createUpdate(id: string, data: any): Promise<any>;
    addDevice(id: string, model: string): void;
    setProperties(message: any): Promise<any>;
}
