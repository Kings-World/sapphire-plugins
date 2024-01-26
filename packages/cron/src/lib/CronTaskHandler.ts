import { container } from "@sapphire/framework";
import type { CronTaskHandlerOptions } from "./types/CronTaskTypes";

export class CronTaskHandler {
    defaultTimezone?: CronTaskHandlerOptions["defaultTimezone"];
    sentry?: CronTaskHandlerOptions["sentry"];

    constructor(options?: CronTaskHandlerOptions) {
        this.defaultTimezone = options?.defaultTimezone;
        this.sentry = options?.sentry;
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
