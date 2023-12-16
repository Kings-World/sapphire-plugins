import "./index";

import {
    container,
    Plugin,
    postInitialization,
    postLogin,
    preGenericsInitialization,
    SapphireClient,
} from "@sapphire/framework";
import type { ClientOptions } from "discord.js";

import { CronTaskStore } from "./lib/structures/CronTaskStore";
import { CronTaskHandler } from "./lib/CronTaskHandler";

export class CronTaskPlugin extends Plugin {
    static [preGenericsInitialization](
        this: SapphireClient,
        options: ClientOptions
    ) {
        container.cron = new CronTaskHandler(options.cron);
    }

    static [postInitialization](this: SapphireClient) {
        this.stores.register(new CronTaskStore());
    }

    static [postLogin](this: SapphireClient) {
        container.cron.startAll();
    }
}

SapphireClient.plugins.registerPreGenericsInitializationHook(
    CronTaskPlugin[preGenericsInitialization],
    "Cron-Task-PreGenericsInitialization"
);

SapphireClient.plugins.registerPostInitializationHook(
    CronTaskPlugin[postInitialization],
    "Cron-Task-PostInitialization"
);

SapphireClient.plugins.registerPostLoginHook(
    CronTaskPlugin[postLogin],
    "Cron-Task-PostLogin"
);
