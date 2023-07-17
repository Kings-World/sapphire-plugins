# @kingsworld/plugin-cron

A simple [@sapphire/framework](https://www.npmjs.com/package/@sapphire/framework) plugin that aims to make use of the [cron](https://www.npmjs.com/package/cron) package and allow users to make cron jobs within their Sapphire discord bot.

## Installation

```sh
yarn add @kingsworld/plugin-cron @sapphire/framework
```

## Usage

Make sure to register the plugin before creating the client

```ts
import "@kingsworld/plugin-cron/register";
```

If you would like to set the default cron job timezone for all your cron jobs, you can do so within the client options. A list of TZ identifers can be found on [Wikipedia](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

```ts
new SapphireClient({
    ...otherClientOptions,
    cron: {
        // the cron object is optional
        defaultTimezone: "Europe/London", // the cron pacakge defaults to UTC
    },
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

Cron Tasks come with their own store, just like Sapphire commands, listeners, and so on. They must be located within a `cron-tasks` directory that is located alongside your other stores.

```
src
├── listeners
|   └── ready.ts
└── cron-tasks
    └── ping.ts
```

Using decorators from [@sapphire/decorators](https://www.npmjs.com/package/@sapphire/decorators):

```ts
import { ApplyOptions } from "@sapphire/decorators";
import { CronTask } from "@kingsworld/plugin-cron";

@ApplyOptions<CronTask.Options>({
    cronTime: "* * * * *",
})
export class PingPong extends CronTask {
    run() {
        this.container.logger.info("Ping Pong! 🏓");
    }
}
```

Using the class constructor:

```ts
import { CronTask } from "@kingsworld/plugin-cron";

export class PingPong extends CronTask {
    constructor(context: CronTask.Context, options: CronTask.Options) {
        super(context, {
            ...options,
            cronTime: "* * * * *",
        });
    }

    run() {
        this.container.logger.info("Ping Pong! 🏓");
    }
}
```

### Frequently Asked Questions

##### What does the `this.info()`, `this.error()`, `this.warn()`, `this.debug()`, and `this.trace()` methods do in the CronTask#run() method?

These methods are small helpers towards Sapphire's logger that prefixes logs with `CronTask[$name]`. The helpers are optional, however, I find them useful when using them in my own projects.

```ts
export class PingPong extends CronTask {
    run() {
        this.info("Ping Pong! 🏓"); // YYYY-MM-DD HH:MM:SS - INFO - CronTask[ping] Ping Pong! 🏓
        this.error("Ping Pong! 🏓"); // YYYY-MM-DD HH:MM:SS - ERROR - CronTask[ping] Ping Pong! 🏓
        this.warn("Ping Pong! 🏓"); // YYYY-MM-DD HH:MM:SS - WARN - CronTask[ping] Ping Pong! 🏓
        this.debug("Ping Pong! 🏓"); // YYYY-MM-DD HH:MM:SS - DEBUG - CronTask[ping] Ping Pong! 🏓
        this.trace("Ping Pong! 🏓"); // YYYY-MM-DD HH:MM:SS - TRACE - CronTask[ping] Ping Pong! 🏓
    }
}
```

### Contributing

#### Getting started

First, clone the repo using git SSH, the GitHub CLI, or HTTP

```sh
git clone git@github.com:Kings-World/sapphire-plugins.git # ssh
git clone https://github.com/Kings-World/sapphire-plugins.git # http
gh repo clone Kings-World/sapphire-plugins # github cli
```

Finally, install the dependencies using Yarn

```sh
yarn # shorthand
yarn install # full command
```
