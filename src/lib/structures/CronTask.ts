import { Piece } from "@sapphire/pieces";
import { CronJob } from "cron";
import type { CronTaskStore } from "./CronTaskStore";
import type { CronJobOptions } from "../types/CronTaskTypes";
import type { Awaitable } from "@sapphire/framework";

export abstract class CronTask extends Piece {
    job: CronJob;

    declare store: CronTaskStore;
    declare options: CronTask.Options;

    constructor(context: Piece.Context, options: CronTask.Options) {
        super(context, options);

        this.job = new CronJob({
            ...options,
            start: false,
            context: this,
            onTick: this.run.bind(this),
            timeZone: options.timeZone ?? this.container.cron.defaultTimezone,
        });
    }

    abstract run(): Awaitable<unknown>;

    info(message: string, ...other: unknown[]) {
        return this.container.logger.info(
            `CronTask[${this.name}] ${message}`,
            ...other
        );
    }

    error(message: string, ...other: unknown[]) {
        return this.container.logger.error(
            `CronTask[${this.name}] ${message}`,
            ...other
        );
    }

    warn(message: string, ...other: unknown[]) {
        return this.container.logger.warn(
            `CronTask[${this.name}] ${message}`,
            ...other
        );
    }

    debug(message: string, ...other: unknown[]) {
        return this.container.logger.debug(
            `CronTask[${this.name}] ${message}`,
            ...other
        );
    }

    trace(message: string, ...other: unknown[]) {
        return this.container.logger.trace(
            `CronTask[${this.name}] ${message}`,
            ...other
        );
    }

    override unload() {
        // job is undefined when an error occurrs during the CronJob construction
        // it is not typed as optional because it should never be undefined otherwise
        if (this.job?.running) {
            this.job.stop();
        }

        return super.unload();
    }
}

export namespace CronTask {
    export type Options = Piece.Options & CronJobOptions;
    export type Context = Piece.Context;
}
