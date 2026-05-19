// This file extends the AdapterConfig type from "@iobroker/types"

// Augment the globally declared type ioBroker.AdapterConfig
declare global {
    namespace ioBroker {
        interface AdapterConfig {
            username: string;
            password: string;
            region: string;
            interval: number;
            interval_raw: number;
        }
    }
}

// this is required so the above AdapterConfig is found by TypeScript / type checking
export {};
