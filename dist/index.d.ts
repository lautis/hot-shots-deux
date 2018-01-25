import { CheckOptions, DatadogChecksValues, EventOptions, StatsD, StatsCb } from "hot-shots";
export declare type Tags = {
    [key: string]: string;
};
export default class Deux {
    readonly client: StatsD;
    constructor(client: StatsD);
    /**
     * Format key-value tags for StatsD protocol
     */
    static format(tags?: Tags): string[] | undefined;
    private static sanitize(value);
    /**
     * Increments a stat by a specified amount
     */
    increment(stat: string | string[], value?: number, sampleRate?: number, tags?: Tags, callback?: StatsCb): void;
    /**
     * Decrements a stat by a specified amount
     */
    decrement(stat: string | string[], value?: number, sampleRate?: number, tags?: Tags, callback?: StatsCb): void;
    /**
     * Represents the timing stat
     */
    timing(stat: string | string[], value: number, sampleRate?: number, tags?: Tags, callback?: StatsCb): void;
    /**
     * Represents the histogram stat
     */
    histogram(stat: string | string[], value: number, sampleRate?: number, tags?: Tags, callback?: StatsCb): void;
    /**
     * Gauges a stat by a specified amount
     */
    gauge(stat: string | string[], value: number, sampleRate?: number, tags?: Tags, callback?: StatsCb): void;
    /**
     * Counts unique values by a specified amount
     */
    set(stat: string | string[], value: number, sampleRate?: number, tags?: Tags, callback?: StatsCb): void;
    /**
     * Counts unique values by a specified amount
     */
    unique(stat: string | string[], value: number, sampleRate?: number, tags?: Tags, callback?: StatsCb): void;
    close(callback: () => void): void;
    /**
     * Send an event
     */
    event(title: string, text?: string, options?: EventOptions, tags?: Tags, callback?: StatsCb): void;
    /**
     * Send a service check
     */
    check(name: string, status: DatadogChecksValues, options?: CheckOptions, tags?: Tags, callback?: StatsCb): void;
}
