import { Store } from '@sapphire/pieces';
import { Cron } from 'croner';
import { CronTask } from './CronTask';
import { normalizePattern } from '../utils/normalizePattern';

export class CronTaskStore extends Store<CronTask, 'cron-tasks'> {
	public constructor() {
		super(CronTask, { name: 'cron-tasks' });
	}

	/**
	 * Loops over all tasks and pauses those that are running.
	 *
	 * @remarks
	 * This method will only pause tasks that:
	 * - Are enabled
	 * - Are currently running
	 * - Have not been permanently stopped
	 *
	 * @returns CronTaskStore
	 */
	public pauseAll() {
		for (const task of this.values()) {
			if (!task.enabled || !task.job.isRunning()) continue;
			task.job.pause();
		}

		Store.logger?.(`[STORE => ${this.name}] [PAUSE] Paused all cronjob tasks.`);
		return this;
	}

	/**
	 * Loops over all tasks and resumes those that are paused.
	 *
	 * @remarks
	 * This method will only resume tasks that:
	 * - Are enabled
	 * - Are not currently running
	 * - Have not been permanently stopped
	 *
	 * @returns CronTaskStore
	 */
	public resumeAll() {
		for (const task of this.values()) {
			if (!task.enabled || task.job.isRunning() || task.job.isStopped()) continue;
			task.job.resume();
		}

		Store.logger?.(`[STORE => ${this.name}] [RESUME] Resumed all cronjob tasks.`);
		return this;
	}

	/**
	 * Loops over all tasks and stops those that are running.
	 *
	 * @remarks
	 * This method will only stop tasks that:
	 * - Are enabled
	 * - Have not been permanently stopped
	 *
	 * ⚠️ Stopping jobs is **permanent** and cannot be resumed afterwards!
	 *
	 * @returns CronTaskStore
	 */
	public stopAll() {
		for (const task of this.values()) {
			if (!task.enabled || task.job.isStopped()) continue;
			task.job.stop();
		}

		Store.logger?.(`[STORE => ${this.name}] [STOP] Stopped all cronjob tasks.`);
		return this;
	}

	public override set(key: string, value: CronTask): this {
		const { pattern, timezone, protect, ...options } = value.options;
		const { sentry, defaultTimezone } = this.container.cronTasks;

		// if a task with the same key already exists, stop it before creating a new one
		if (this.has(key)) {
			Store.logger?.(`[STORE => ${this.name}] [SET] Stopping existing cronjob task before creating a new one.`);
			this.get(key)?.job.stop();
		}

		const timeZone = timezone ?? defaultTimezone;

		try {
			Store.logger?.(
				`[STORE => ${this.name}] [SET] Creating cronjob for ${key} with '${pattern}' as the pattern and '${timeZone}' for the timezone`
			);

			value.job = new Cron(
				pattern,
				{
					name: key,
					timezone: timeZone,
					paused: true, // we start the job manually once the client is ready
					protect: value.protect?.bind(value) ?? protect,
					catch: (error) => {
						value.error('Encountered an error while running the cron job', error);
						sentry?.captureException(error);
						value.catch?.bind(value)(error, value.job);
					},
					...options
				},
				async () => {
					// we only want to monitor cron patterns and not single-use tasks that croner supports
					if (sentry && typeof pattern === 'string' && !pattern.includes(':')) {
						await sentry.withMonitor(key, () => value.run.bind(value)(), {
							schedule: { type: 'crontab', value: normalizePattern(pattern) },
							timezone: timeZone
						});
					} else {
						await value.run.bind(value)();
					}
				}
			);
		} catch (error) {
			value.error('Encountered an error while creating the cron job', error);
			void value.unload();
		}

		return super.set(key, value);
	}

	/**
	 * Deletes a task from the store and stops it if it's running.
	 */
	public override delete(key: string) {
		const task = this.get(key);
		if (task && !task.job.isStopped()) {
			task.job.stop();
		}

		return super.delete(key);
	}

	/**
	 * Stops all running cron jobs and clears the store.
	 */
	public override clear() {
		this.stopAll();
		return super.clear();
	}
}
