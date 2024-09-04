<div align="center">

# @kingsworld/plugin-cron

**Plugin for <a href="https://github.com/sapphiredev/framework">@sapphire/framework</a> to add support for cron tasks using <a href="https://github.com/kelektiv/node-cron">cron</a>.**

[![GitHub](https://img.shields.io/github/license/Kings-World/sapphire-plugins)](https://github.com/Kings-World/sapphire-plugins/blob/main/LICENSE.md)
[![npm bundle size](https://pkg-size.dev/badge/bundle/83411)](https://pkg-size.dev/@kingsworld/plugin-cron)
[![npm](https://img.shields.io/npm/v/@kingsworld/plugin-cron?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@kingsworld/plugin-cron)

</div>

## Description

This plugin adds support for cron tasks to the Sapphire framework. It uses the [cron](ttps://www.npmjs.com/package/@kingsworld/plugin-cron) package to create and manage cron tasks.

## Features

-   Full TypeScript support
-   Includes ESM entrypoint

## Installation

`@kingsworld/plugin-cron` depends on the following packages. Be sure to install these along with this package!

-   [`@sapphire/framework`](https://www.npmjs.com/package/@sapphire/framework)

You can use the following command to install this package along with `cron`, or replace `npm install` with your package manager of choice.

```sh
npm install @kingsworld/plugin-cron @sapphire/framework
```

## Usage

This registers the necessary options and methods in the Sapphire client to be able to use the cron plugin.

```ts
// Main bot file
// Be sure to register the plugin before instantiating the client.
import '@kingsworld/plugin-cron/register';
```

Then, you can configure the plugin in the configuration options in your SapphireClient extension class or initializer. This will either be located in your new SapphireClient constructor call, or super in your constructor method if you use an extension class.

```ts
const options = {
	...otherClientOptionsGoHere,
	cron: {
		/**
		 * Whether to disable Sentry cron monitoring
		 * @default false
		 */
		disableSentry: false,
		/**
		 * The timezone to use for the cron tasks
		 * @default 'UTC'
		 */
		defaultTimezone: 'Europe/London'
	}
};
```

-   The `disableSentry` option is used to disable Sentry's cron monitoring. By default, it is set to `false`, which means Sentry cron monitoring is enabled if the `@sentry/node` package is installed and configured. This makes using Sentry an opt-in feature - you first opt in by installing `@sentry/node`. The `disableSentry` option then allows you to opt out in specific situations. You can set this to `true` to disable cron monitoring, which can be useful during development or if you haven't provided a Sentry DSN. If you don't use Sentry at all (i.e., `@sentry/node` is not installed), this option has no effect and can be safely ignored.

In order to use the cron tasks anywhere other than a piece (commands, arguments, preconditions, etc.), you must first import the `container` property of `@sapphire/framework`. For pieces, you can simply use `this.container.cron` to access this plugin's methods.

This is a simple example of how to start a task from a service.

```typescript
import { container } from '@sapphire/framework';

export class MyAwesomeService {
	public createAwesomeTask() {
		const task = container.cron.store.get('my-awesome-task');

		task.job.start();
	}
}
```

This is a simple example of how to start all tasks from a service.

```typescript
import { container } from '@sapphire/framework';

export class MyAwesomeService {
	public createAwesomeTask() {
		container.cron.startAll();
	}
}
```

It's important to note that the `startAll()` method is called automatically when the client is ready. Therefore, it's generally not necessary to call this method manually, unless you have a specific need to restart all cron tasks at some point after the client has been initialized.

### Create a task handler

Cron tasks use their own store, like other types of pieces. You can create a directory alongside your commands directory named `cron-tasks` and place your tasks there, but they must inherit from `CronTask`, like so.

##### Creating the Piece:

```typescript
import { CronTask } from '@kingsworld/plugin-cron';

export class PingPong extends CronTask {
	public constructor(context: CronTask.LoaderContext, options: CronTask.Options) {
		super(context, {
			...options,
			cronTime: '* * * * *'
		});
	}

	public run() {
		this.container.logger.info('Ping Pong! 🏓');
	}
}
```

### Logging Helpers

The `CronTask` class provides logging helpers that are similar to the ones provided by the `Logger` class. These helpers are `info`, `error`, `warn`, `debug`, and `trace`. They all take a single string argument, which is the message to log.

This is an example of how to use the `info` helper:

```typescript
import { CronTask } from '@kingsworld/plugin-cron';

export class PingPong extends CronTask {
	public constructor(context: CronTask.LoaderContext, options: CronTask.Options) {
		super(context, {
			...options,
			cronTime: '* * * * *'
		});
	}

	public run() {
		this.info('Ping Pong! 🏓'); // CronTask[ping] Ping Pong! 🏓
	}
}
```

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

Thank you to all the people who already contributed to Sapphire!

<a href="https://github.com/Kings-World/sapphire-plugins/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Kings-World/sapphire-plugins" />
</a>

[contributing]: https://github.com/Kings-World/sapphire-plugins/blob/main/.github/CONTRIBUTING.md
