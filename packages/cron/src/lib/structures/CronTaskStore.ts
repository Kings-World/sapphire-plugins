import { Store } from '@sapphire/pieces';
import { CronJob } from 'cron';
import { CronTask } from './CronTask';
import { Info, DateTime, FixedOffsetZone, type Zone } from 'luxon';

export class CronTaskStore extends Store<CronTask, 'cron-tasks'> {
	public constructor() {
		super(CronTask, { name: 'cron-tasks' });
	}

	/**
	 * Loops over all tasks and starts those that are enabled.
	 * This gets called automatically when the Client is ready.
	 * @returns CronTaskStore
	 */
	public startAll() {
		for (const task of this.values()) {
			if (!task.enabled) continue;
			task.job.start();
		}

		Store.logger?.(`[STORE => ${this.name}] [START] Started all cronjob tasks.`);
		return this;
	}

	/**
	 * Loops over all tasks and stops those that are running.
	 * @returns CronTaskStore
	 */
	public stopAll() {
		for (const task of this.values()) {
			if (!task.job.running) continue;
			task.job.stop();
		}

		Store.logger?.(`[STORE => ${this.name}] [STOP] Stopped all cronjob tasks.`);
		return this;
	}

	public override set(key: string, value: CronTask): this {
		const { options } = value;

		const { sentry, defaultTimezone } = this.container.cron;
		const cronJob = sentry ? sentry.cron.instrumentCron(CronJob, key) : CronJob;

		try {
			value.job = cronJob.from({
				...options,
				onTick: () => void value.run.bind(value)(),
				start: false,
				context: value,
				timeZone: this.formatLuxonZone(options.timeZone ?? defaultTimezone)
			});
		} catch (error) {
			value.error('Encountered an error while creating the cron job', error);
			void value.unload();
		}

		return super.set(key, value);
	}

	public override delete(key: string) {
		const task = this.get(key);
		if (task?.job.running) {
			task.job.stop();
		}

		return super.delete(key);
	}

	/**
	 * Stops all running cron jobs and clears the store.
	 * @returns void
	 */
	public override clear() {
		this.stopAll();
		return super.clear();
	}

	/**
	 * Formats a Luxon-compatible timezone string into a TZ timezone string.
	 * This is required because Sentry requires time zones to be in TZ format.
	 * @param timezone The Luxon-compatible timezone to format.
	 * @returns The formatted TZ timezone.
	 * @private
	 */
	private formatLuxonZone(timezone?: string | Zone | number) {
		const zone = Info.normalizeZone(timezone);

		// If the zone is invalid, return the system zone
		if (!zone.isValid) return DateTime.local().zoneName;

		// If the zone is a fixed offset zone, return the IANA name
		if (zone instanceof FixedOffsetZone) return zone.ianaName;

		// Otherwise, return the zone name
		return zone.name;
	}
}
