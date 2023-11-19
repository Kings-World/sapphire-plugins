import type { CronJobParams } from "cron";
import type { CronTask } from "../structures/CronTask";

export interface CronTaskHandlerOptions {
    defaultTimezone?: string;
}

export type CronJobOptions = Omit<
    CronJobParams<null, CronTask>,
    "onTick" | "onComplete" | "start" | "context" | "utcOffset"
>;
