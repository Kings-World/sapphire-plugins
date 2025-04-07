import type { CronOptions } from 'croner';

export interface CronTaskHandlerOptions {
	/**
	 * The default IANA timezone to use for all cron jobs.
	 * You can override this per task, using the timezone option.
	 */
	defaultTimezone?: string;

	/**
	 * The ability to opt-out of instrumenting cron jobs with Sentry.
	 * If you don't use Sentry, you can ignore this option.
	 * @see https://docs.sentry.io/product/crons/
	 * @default false
	 */
	disableSentry: boolean;
}

export interface CronJobOptions extends Pick<CronOptions, 'maxRuns' | 'unref' | 'timezone'> {
	pattern: string | Date;
	/**
	 * If true, prevents the job from running if the previous execution is still in progress.
	 * If the task has a protect method, it will be called if the job is blocked.
	 * @default false
	 */
	protect?: boolean;
}
