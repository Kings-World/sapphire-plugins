import { container } from "@sapphire/framework";
import type { CronTaskHandlerOptions } from "./types/CronTaskTypes";
import type Sentry from "@sentry/node";

export class CronTaskHandler {
    defaultTimezone?: CronTaskHandlerOptions["defaultTimezone"];
    disableSentry?: boolean;
    sentry?: typeof Sentry;

    constructor(options?: CronTaskHandlerOptions) {
        this.defaultTimezone = options?.defaultTimezone;
        this.disableSentry = options?.disableSentry;
    }

    startAll() {
        this.store.startAll();
    }

    stopAll() {
        this.store.stopAll();
    }

    private get store() {
        return container.stores.get("cron-tasks");
    }
}
