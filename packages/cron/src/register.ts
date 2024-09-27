import './index';

import { container, Plugin, postInitialization, postLogin, preGenericsInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { CronTaskHandler, CronTaskStore } from './index';

export class CronTaskPlugin extends Plugin {
	public static [preGenericsInitialization](this: SapphireClient, options: ClientOptions) {
		container.cron = new CronTaskHandler(options.cron);
	}

	public static [postInitialization](this: SapphireClient) {
		this.stores.register(new CronTaskStore());
	}

	public static async [preLogin](this: SapphireClient) {
		if (container.cron.disableSentry) return;
		container.cron.sentry = await import('@sentry/node').catch(() => undefined);
	}

	public static [postLogin](this: SapphireClient) {
		container.cron.startAll();
	}
}

SapphireClient.plugins.registerPreGenericsInitializationHook(CronTaskPlugin[preGenericsInitialization], 'Cron-Task-PreGenericsInitialization');

SapphireClient.plugins.registerPostInitializationHook(CronTaskPlugin[postInitialization], 'Cron-Task-PostInitialization');

SapphireClient.plugins.registerPreLoginHook(CronTaskPlugin[preLogin], 'Cron-Task-PreLogin');

SapphireClient.plugins.registerPostLoginHook(CronTaskPlugin[postLogin], 'Cron-Task-PostLogin');
