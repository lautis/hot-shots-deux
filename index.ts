import {
  CheckOptions,
  DatadogChecksValues,
  EventOptions,
  StatsD,
  StatsCb
} from "hot-shots";

export type Tags = { [key: string]: string };

export default class Deux {
  public readonly client: StatsD;

  constructor(client: StatsD) {
    this.client = client;
  }

  /**
   * Format key-value tags for StatsD protocol
   */
  public static format(tags?: Tags) {
    if (tags) {
      return Object.keys(tags).map(
        key => `${Deux.sanitize(key)}:${Deux.sanitize(tags[key])}`
      );
    } else {
      return tags;
    }
  }

  private static sanitize(value: string): string {
    // Replace reserved chars (: | @) with underscores.
    return (value + "").replace(/:|\||@/g, "_");
  }

  /**
   * Increments a stat by a specified amount
   */
  public increment(
    stat: string | string[],
    value: number = 1,
    sampleRate?: number,
    tags?: Tags,
    callback?: StatsCb
  ) {
    this.client.increment(stat, value, sampleRate, Deux.format(tags), callback);
  }

  /**
   * Decrements a stat by a specified amount
   */
  public decrement(
    stat: string | string[],
    value: number = 1,
    sampleRate?: number,
    tags?: Tags,
    callback?: StatsCb
  ) {
    this.client.decrement(stat, value, sampleRate, Deux.format(tags), callback);
  }

  /**
   * Represents the timing stat
   */
  public timing(
    stat: string | string[],
    value: number,
    sampleRate?: number,
    tags?: Tags,
    callback?: StatsCb
  ) {
    this.client.timing(stat, value, sampleRate, Deux.format(tags), callback);
  }

  /**
   * Represents the histogram stat
   */
  public histogram(
    stat: string | string[],
    value: number,
    sampleRate?: number,
    tags?: Tags,
    callback?: StatsCb
  ) {
    this.client.histogram(stat, value, sampleRate, Deux.format(tags), callback);
  }

  /**
   * Gauges a stat by a specified amount
   */
  public gauge(
    stat: string | string[],
    value: number,
    sampleRate?: number,
    tags?: Tags,
    callback?: StatsCb
  ) {
    this.client.gauge(stat, value, sampleRate, Deux.format(tags), callback);
  }

  /**
   * Counts unique values by a specified amount
   */
  public set(
    stat: string | string[],
    value: number,
    sampleRate?: number,
    tags?: Tags,
    callback?: StatsCb
  ) {
    this.client.set(stat, value, sampleRate, Deux.format(tags), callback);
  }

  /**
   * Counts unique values by a specified amount
   */
  public unique(
    stat: string | string[],
    value: number,
    sampleRate?: number,
    tags?: Tags,
    callback?: StatsCb
  ) {
    this.client.unique(stat, value, sampleRate, Deux.format(tags), callback);
  }

  public close(callback: () => void) {
    this.client.close(callback);
  }

  /**
   * Send an event
   */
  public event(
    title: string,
    text?: string,
    options?: EventOptions,
    tags?: Tags,
    callback?: StatsCb
  ) {
    this.client.event(title, text, options, Deux.format(tags), callback);
  }

  /**
   * Send a service check
   */
  public check(
    name: string,
    status: DatadogChecksValues,
    options?: CheckOptions,
    tags?: Tags,
    callback?: StatsCb
  ) {
    this.client.check(name, status, options, Deux.format(tags), callback);
  }
}
