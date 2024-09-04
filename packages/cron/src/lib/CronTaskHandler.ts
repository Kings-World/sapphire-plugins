import { container } from '@sapphire/framework';
import type Sentry from '@sentry/node';
import type { CronTaskHandlerOptions } from './types/CronTaskTypes';

export class CronTaskHandler {
	/**
	 * The default timezone to use for all cron tasks.
	 * You can override this per task, using the timeZone option.
	 * @see https://github.com/moment/luxon/blob/master/docs/zones.md#specifying-a-zone
	 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
	 * @default 'UTC'
	 */
	public defaultTimezone: CronTaskHandlerOptions['defaultTimezone'];

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

	public constructor(options?: CronTaskHandlerOptions) {
		this.defaultTimezone = options?.defaultTimezone ?? 'UTC';
		this.disableSentry = options?.disableSentry ?? false;
	}

	/**
	 * Start all enabled cron jobs.
	 * This gets called automatically when the Client is ready.
	 */
	public startAll() {
		this.store.startAll();
	}

	/**
	 * Stop all running cron jobs.
	 */
	public stopAll() {
		this.store.stopAll();
	}

	/**
	 * Get the cron task store.
	 */
	private get store() {
		return container.stores.get('cron-tasks');
	}
}
