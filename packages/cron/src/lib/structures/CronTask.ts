import type { Awaitable } from '@sapphire/framework';
import { Piece } from '@sapphire/pieces';
import type { CronJob } from 'cron';
import type { CronJobOptions } from '../types/CronTaskTypes';

export abstract class CronTask<Options extends CronTask.Options = CronTask.Options> extends Piece<Options, 'cron-tasks'> {
	public declare job: CronJob<null, CronTask>;

	public constructor(context: CronTask.LoaderContext, options: Options) {
		super(context, options);
	}

	public abstract run(): Awaitable<unknown>;

	public info(message: string, ...other: unknown[]) {
		this.container.logger.info(`CronTask[${this.name}] ${message}`, ...other);
	}

	public error(message: string, ...other: unknown[]) {
		this.container.logger.error(`CronTask[${this.name}] ${message}`, ...other);
	}

	public warn(message: string, ...other: unknown[]) {
		this.container.logger.warn(`CronTask[${this.name}] ${message}`, ...other);
	}

	public debug(message: string, ...other: unknown[]) {
		this.container.logger.debug(`CronTask[${this.name}] ${message}`, ...other);
	}

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
