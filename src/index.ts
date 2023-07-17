import "tslib";

import type { CronTaskStore } from "./lib/structures/CronTaskStore";
import type { CronTaskHandler } from "./lib/CronTaskHandler";
import type { CronTaskHandlerOptions } from "./lib/types/CronTaskTypes";

export * from "./lib/CronTaskHandler";
export * from "./lib/structures/CronTask";
export * from "./lib/structures/CronTaskStore";
export * from "./lib/types/CronTaskTypes";

declare module "@sapphire/pieces" {
    interface Container {
        cron: CronTaskHandler;
    }

    interface StoreRegistryEntries {
        "cron-tasks": CronTaskStore;
    }
}

declare module "discord.js" {
    export interface ClientOptions {
        cron?: CronTaskHandlerOptions;
    }
}
