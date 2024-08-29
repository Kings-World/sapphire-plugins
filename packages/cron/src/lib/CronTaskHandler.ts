import { container } from '@sapphire/framework';
import type Sentry from '@sentry/node';
import type { CronTaskHandlerOptions } from './types/CronTaskTypes';

export class CronTaskHandler {
	public defaultTimezone?: CronTaskHandlerOptions['defaultTimezone'];
	public disableSentry?: boolean;
	public sentry?: typeof Sentry;

	public constructor(options?: CronTaskHandlerOptions) {
		this.defaultTimezone = options?.defaultTimezone;
		this.disableSentry = options?.disableSentry;
	}

	public startAll() {
		this.store.startAll();
	}

	public stopAll() {
		this.store.stopAll();
	}

	private get store() {
		return container.stores.get('cron-tasks');
	}
}
