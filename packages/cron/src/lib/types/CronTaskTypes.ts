import type { CronJobParams } from "cron";
import type { CronTask } from "../structures/CronTask";
import type Sentry from "@sentry/node";

export interface CronTaskHandlerOptions {
    /**
     * The default timezone to use for all cron tasks.
     * You can override this per task, using the timeZone option.
     * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
     * @default "UTC"
     */
    defaultTimezone?: string;
    /**
     * The Sentry instance to use for instrumenting cron jobs.
     * If you don't use Sentry, you can ignore this option.
     * @see https://docs.sentry.io/product/crons/
     * @default undefined
     */
    sentry?: typeof Sentry;
}

export type CronJobOptions = Omit<
    CronJobParams<null, CronTask>,
    "onTick" | "onComplete" | "start" | "context" | "utcOffset"
>;
