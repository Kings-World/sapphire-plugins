import type { CronJobParams } from 'cron';
import type { CronTask } from '../structures/CronTask';

export interface CronTaskHandlerOptions {
	/**
	 * The default timezone to use for all cron tasks.
	 * You can override this per task, using the timeZone option.
	 * @see https://github.com/moment/luxon/blob/master/docs/zones.md#specifying-a-zone
	 * @default 'system'
	 */
	defaultTimezone: string;

	/**
	 * The ability to opt-out of instrumenting cron jobs with Sentry.
	 * If you don't use Sentry, you can ignore this option.
	 * @see https://docs.sentry.io/product/crons/
	 * @default false
	 */
	disableSentry: boolean;
}

export type CronJobOptions = Omit<CronJobParams<null, CronTask>, 'onTick' | 'onComplete' | 'start' | 'context' | 'utcOffset'>;
