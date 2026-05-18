export interface Objects {
    createAuth(): Promise<any>;
    createMqtt(): Promise<any>;
    createRaw(id: string, name: string, model: string): Promise<any>;
}

export type CommonStates = {
    name:
        | {
              en: string;
              de: string;
              ru: string;
              pt: string;
              nl: string;
              fr: string;
              it: string;
              es: string;
              pl: string;
              uk: string;
              "zh-cn": string;
          }
        | string;
    desc: string;
    statusStates?: {
        onlineId: string;
    };
    icon?: string | null;
    type?: "string" | "number" | "button" | "boolean";
    role?:
        | "json"
        | "button.stop"
        | "button.pause"
        | "button.start"
        | "switch"
        | "state"
        | "button"
        | "value"
        | "button.volume.up"
        | "button.fastforward"
        | "indicator.connected"
        | "button.volume.down"
        | "value.brightness"
        | "date.start"
        | "date.end"
        | "value.time"
        | "time.span";
    write?: boolean;
    read?: boolean;
    def?: string | number | boolean;
    state?: "device" | "channel" | "state";
    states?: { [key in string]: string };
    min?: number;
    max?: number;
    unit?: number | string;
    step?: number;
};
