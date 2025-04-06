import type Sentry from '@sentry/node';
import type { CronTaskHandlerOptions } from './types/CronTaskTypes';

export class CronTaskHandler {
	/**
	 * The default IANA timezone to use for all cron jobs.
	 * You can override this per task, using the timezone option.
	 */
	public defaultTimezone?: CronTaskHandlerOptions['defaultTimezone'];

	/**
	 * The ability to opt-out of instrumenting cron jobs with Sentry.
	 * If you don't use Sentry, you can ignore this option.
	 * @see https://docs.sentry.io/product/crons/
	 * @default false
	 */
	public disableSentry: boolean;

	/**
	 * The Sentry instance to use for instrumenting cron jobs.
	 * This is only available when [`@sentry/node`](https://www.npmjs.com/package/@sentry/node)
	 * is installed and the {@linkcode disableSentry} option is set to false.
	 */
	public sentry?: typeof Sentry;

	public constructor(options?: Partial<CronTaskHandlerOptions>) {
		this.defaultTimezone = options?.defaultTimezone;
		this.disableSentry = options?.disableSentry ?? false;
	}
}
