import { Piece } from "@sapphire/pieces";
import type { CronJob } from "cron";
import type { CronTaskStore } from "./CronTaskStore";
import type { CronJobOptions } from "../types/CronTaskTypes";
import type { Awaitable } from "@sapphire/framework";

export abstract class CronTask extends Piece {
    declare job: CronJob<null, CronTask>;
    declare store: CronTaskStore;
    declare options: CronTask.Options;

    constructor(context: CronTask.LoaderContext, options: CronTask.Options) {
        super(context, options);
    }

    abstract run(): Awaitable<unknown>;

    info(message: string, ...other: unknown[]) {
        this.container.logger.info(
            `CronTask[${this.name}] ${message}`,
            ...other
        );
    }

    error(message: string, ...other: unknown[]) {
        this.container.logger.error(
            `CronTask[${this.name}] ${message}`,
            ...other
        );
    }

    warn(message: string, ...other: unknown[]) {
        this.container.logger.warn(
            `CronTask[${this.name}] ${message}`,
            ...other
        );
    }

    debug(message: string, ...other: unknown[]) {
        this.container.logger.debug(
            `CronTask[${this.name}] ${message}`,
            ...other
        );
    }

    trace(message: string, ...other: unknown[]) {
        this.container.logger.trace(
            `CronTask[${this.name}] ${message}`,
            ...other
        );
    }
}

export namespace CronTask {
    export type Options = Piece.Options & CronJobOptions;
    /** @deprecated Use {@linkcode LoaderContext} instead. */
    export type Context = LoaderContext;
    export type LoaderContext = Piece.LoaderContext<"cron-tasks">;
}
