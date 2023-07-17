import { container } from "@sapphire/framework";
import type { CronTaskHandlerOptions } from "./types/CronTaskTypes";

export class CronTaskHandler {
    defaultTimezone?: CronTaskHandlerOptions["defaultTimezone"];

    constructor(options?: CronTaskHandlerOptions) {
        this.defaultTimezone = options?.defaultTimezone;
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
