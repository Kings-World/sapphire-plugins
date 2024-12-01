import type { Awaitable } from '@sapphire/framework';
import { Piece } from '@sapphire/pieces';
import type { CronJob } from 'cron';
import type { CronJobOptions } from '../types/CronTaskTypes';

/**
 * @example
 *
 * ```typescript
 * // ping.ts
 * import { CronTask } from '@kingsworld/plugin-cron';
 *
 * export class PingPong extends CronTask {
 * 	public constructor(context: CronTask.LoaderContext, options: CronTask.Options) {
 * 		super(context, {
 * 			...options,
 * 			cronTime: '* * * * *'
 * 		});
 * 	}
 *
 * 	public run() {
 * 		this.info('Ping Pong! 🏓'); // CronTask[ping] Ping Pong! 🏓
 * 	}
 * }
 * ```
 */
export abstract class CronTask<Options extends CronTask.Options = CronTask.Options> extends Piece<Options, 'cron-tasks'> {
	declare public job: CronJob<null, CronTask>;

	public constructor(context: CronTask.LoaderContext, options: Options) {
		super(context, options);
	}

	public abstract run(): Awaitable<unknown>;

	/**
	 * A helper function to log messages with the `CronTask[${name}]` prefix.
	 * @param message The message to include after the prefix
	 * @param other Extra parameters to pass to the logger
	 * @example
	 * this.info('Hello world!'); // CronTask[my-task] Hello world!
	 */
	public info(message: string, ...other: unknown[]) {
		this.container.logger.info(`CronTask[${this.name}] ${message}`, ...other);
	}

	/**
	 * A helper function to log messages with the `CronTask[${name}]` prefix.
	 * @param message The message to include after the prefix
	 * @param other Extra parameters to pass to the logger
	 * @example
	 * this.error('Something went wrong!'); // CronTask[my-task] Something went wrong!
	 */
	public error(message: string, ...other: unknown[]) {
		this.container.logger.error(`CronTask[${this.name}] ${message}`, ...other);
	}

	/**
	 * A helper function to log messages with the `CronTask[${name}]` prefix.
	 * @param message The message to include after the prefix
	 * @param other Extra parameters to pass to the logger
	 * @example
	 * this.warn('Something is not right!'); // CronTask[my-task] Something is not right!
	 */
	public warn(message: string, ...other: unknown[]) {
		this.container.logger.warn(`CronTask[${this.name}] ${message}`, ...other);
	}

	/**
	 * A helper function to log messages with the `CronTask[${name}]` prefix.
	 * @param message The message to include after the prefix
	 * @param other Extra parameters to pass to the logger
	 * @example
	 * this.debug('Something is happening!'); // CronTask[my-task] Something is happening!
	 */
	public debug(message: string, ...other: unknown[]) {
		this.container.logger.debug(`CronTask[${this.name}] ${message}`, ...other);
	}

	/**
	 * A helper function to log messages with the `CronTask[${name}]` prefix.
	 * @param message The message to include after the prefix
	 * @param other Extra parameters to pass to the logger
	 * @example
	 * this.trace('Loaded the file.'); // CronTask[my-task] Loaded the file.
	 */
	public trace(message: string, ...other: unknown[]) {
		this.container.logger.trace(`CronTask[${this.name}] ${message}`, ...other);
	}
}

export namespace CronTask {
	export type Options = Piece.Options & CronJobOptions;
	/** @deprecated Use {@linkcode LoaderContext} instead. */
	export type Context = LoaderContext;
	export type LoaderContext = Piece.LoaderContext<'cron-tasks'>;
}
