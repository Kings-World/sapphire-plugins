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

/**
 * The [@kingsworld/plugin-cron](https://github.com/Kings-World/sapphire-plugins/tree/main/packages/cron) version that you are currently using.
 * An example use of this is showing it of in a bot information command.
 *
 * Note to Sapphire developers: This needs to explicitly be `string` so it is not typed as the string that gets replaced by esbuild
 */
export const version: string = "[VI]{{inject}}[/VI]";
