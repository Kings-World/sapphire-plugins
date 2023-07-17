import type { CronJobParameters } from "cron";

export interface CronTaskHandlerOptions {
    defaultTimezone?: string;
}

export type CronJobOptions = Omit<
    CronJobParameters,
    "onTick" | "onComplete" | "start" | "context"
>;
