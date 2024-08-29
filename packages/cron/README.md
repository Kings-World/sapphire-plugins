# @kingsworld/plugin-cron

A plugin for [@sapphire/framework](https://www.npmjs.com/package/@sapphire/framework) that adds integration for the [cron](https://www.npmjs.com/package/cron) package.

## Installation

```sh
yarn add @kingsworld/plugin-cron @sapphire/framework
```

## Usage

Make sure to register the plugin before creating the client

```ts
import '@kingsworld/plugin-cron/register';
```

If you want to set the default cron job timezone for all your cron jobs, you can do so within the client options. A list of TZ identifiers can be found on [Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

```ts
new SapphireClient({
	...otherClientOptions,
	cron: {
		// the cron object is optional
		defaultTimezone: 'Europe/London' // the cron package defaults to UTC
	}
});
```

However, if you would like to do so for a single task, you can do so in the cron task options

```js
{
    cronTime: "* * * * *", // every minute
    timeZone: "Europe/London"
}
```

### Creating a task

Cron Tasks come with their own Sapphire store. They must be located within a `cron-tasks` directory alongside your other stores.

```
src
├── listeners
|   └── ready.ts
└── cron-tasks
    └── ping.ts
```

Using decorators from [@sapphire/decorators](https://www.npmjs.com/package/@sapphire/decorators):

```ts
import { ApplyOptions } from '@sapphire/decorators';
import { CronTask } from '@kingsworld/plugin-cron';

@ApplyOptions<CronTask.Options>({
	cronTime: '* * * * *'
})
export class PingPong extends CronTask {
	run() {
		this.container.logger.info('Ping Pong! 🏓');
	}
}
```

Using the class constructor:

```ts
import { CronTask } from '@kingsworld/plugin-cron';

export class PingPong extends CronTask {
	constructor(context: CronTask.LoaderContext, options: CronTask.Options) {
		super(context, {
			...options,
			cronTime: '* * * * *'
		});
	}

	run() {
		this.container.logger.info('Ping Pong! 🏓');
	}
}
```

### Managing tasks

A cron-task can be disabled completely using the `enabled` option.

```js
{
    cronTime: "* * * * *", // every minute
    enabled: false
}
```

You can also stop/start them at any time during runtime.

```js
const pingTask = container.cron.store.get('ping');

// to start the task
pingTask.job.start();

// to stop the task
pingTask.job.stop();
```

### Sentry

The plugin also supports Sentry's [Cron Monitoring](https://docs.sentry.io/product/crons/) product. Using it is as simple as having [@sentry/node](https://www.npmjs.com/package/@sentry/node) installed.

If you would like to disable it for whatever reason, you can do so by adding `disableSentry` to your Client's cron options.

```js
new SapphireClient({
    cron: {
        disableSentry: true;
    },
});
```

### Logging Helpers

One last thing that comes with the plugin is logging helper functions that can be used within your cron tasks.

The methods are there to help when logging things to the console using Sapphire's logger. They simply prefix `CronTask[$name]` to the start of your messages. It is something I find useful when using them in my projects.

These methods are small helpers towards Sapphire's logger that prefixes logs with `CronTask[$name]`. The helpers are optional, however, I find them useful when using them in my projects.

```ts
export class PingPong extends CronTask {
	run() {
		// INFO - CronTask[ping] Your ping has been ponged successfully.
		this.info('Your ping has been ponged successfully.');

		// ERROR - CronTask[ping] Something went wrong when trying to send your ping!
		this.error('Something went wrong when trying to send your ping!');

		// WARN - CronTask[ping] The ping failed to send.
		this.warn('The ping failed to send.');

		// DEBUG - CronTask[ping] Your ping is being sent.
		this.debug('Your ping is being sent.');

		// TRACE - CronTask[ping] Tracing your ping's steps. Please wait!
		this.trace("Tracing your ping's steps. Please wait!");
	}
}
```
