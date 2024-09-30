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

/**
 * The @types/luxon package doesn't seem to be up-to-date with luxon.
 * Therefore, I have to manually add the ianaName getter to the FixedOffsetZone class.
 * The code can be found here: https://github.com/moment/luxon/blob/3e9983cd0680fdf7836fcee638d34e3edc682380/src/zones/fixedOffsetZone.js#L80C7-L80C15
 */
declare module 'luxon' {
	interface FixedOffsetZone {
		/**
		 * The IANA name of this zone, i.e. `Etc/UTC` or `Etc/GMT+/-nn`
		 */
		get ianaName(): string;
	}
}
