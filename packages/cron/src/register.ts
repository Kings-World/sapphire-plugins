import './index';

import { container, Plugin, postInitialization, postLogin, preGenericsInitialization, preLogin, SapphireClient } from '@sapphire/framework';
import type { ClientOptions } from 'discord.js';
import { CronTaskHandler, CronTaskStore } from './index';

export class CronTaskPlugin extends Plugin {
	public static override [preGenericsInitialization](this: SapphireClient, options: ClientOptions) {
		container.cronTasks = new CronTaskHandler(options.cronTasks);
	}

	public static override [postInitialization](this: SapphireClient) {
		this.stores.register(new CronTaskStore());
	}

	public static override async [preLogin](this: SapphireClient) {
		if (container.cronTasks.disableSentry) return;
		container.cronTasks.sentry = await import('@sentry/node').catch(() => undefined);
	}

	public static override [postLogin](this: SapphireClient) {
		this.stores.get('cron-tasks').resumeAll();
	}
}

SapphireClient.plugins.registerPreGenericsInitializationHook(CronTaskPlugin[preGenericsInitialization], 'Cron-Task-PreGenericsInitialization');

SapphireClient.plugins.registerPostInitializationHook(CronTaskPlugin[postInitialization], 'Cron-Task-PostInitialization');

SapphireClient.plugins.registerPreLoginHook(CronTaskPlugin[preLogin], 'Cron-Task-PreLogin');

SapphireClient.plugins.registerPostLoginHook(CronTaskPlugin[postLogin], 'Cron-Task-PostLogin');
