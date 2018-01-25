"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Deux = /** @class */ (function () {
    function Deux(client) {
        this.client = client;
    }
    /**
     * Format key-value tags for StatsD protocol
     */
    Deux.format = function (tags) {
        if (tags) {
            return Object.keys(tags).map(function (key) { return Deux.sanitize(key) + ":" + Deux.sanitize(tags[key]); });
        }
        else {
            return tags;
        }
    };
    Deux.sanitize = function (value) {
        // Replace reserved chars (: | @) with underscores.
        return (value + "").replace(/:|\||@/g, "_");
    };
    /**
     * Increments a stat by a specified amount
     */
    Deux.prototype.increment = function (stat, value, sampleRate, tags, callback) {
        if (value === void 0) { value = 1; }
        this.client.increment(stat, value, sampleRate, Deux.format(tags), callback);
    };
    /**
     * Decrements a stat by a specified amount
     */
    Deux.prototype.decrement = function (stat, value, sampleRate, tags, callback) {
        if (value === void 0) { value = 1; }
        this.client.decrement(stat, value, sampleRate, Deux.format(tags), callback);
    };
    /**
     * Represents the timing stat
     */
    Deux.prototype.timing = function (stat, value, sampleRate, tags, callback) {
        this.client.timing(stat, value, sampleRate, Deux.format(tags), callback);
    };
    /**
     * Represents the histogram stat
     */
    Deux.prototype.histogram = function (stat, value, sampleRate, tags, callback) {
        this.client.histogram(stat, value, sampleRate, Deux.format(tags), callback);
    };
    /**
     * Gauges a stat by a specified amount
     */
    Deux.prototype.gauge = function (stat, value, sampleRate, tags, callback) {
        this.client.gauge(stat, value, sampleRate, Deux.format(tags), callback);
    };
    /**
     * Counts unique values by a specified amount
     */
    Deux.prototype.set = function (stat, value, sampleRate, tags, callback) {
        this.client.set(stat, value, sampleRate, Deux.format(tags), callback);
    };
    /**
     * Counts unique values by a specified amount
     */
    Deux.prototype.unique = function (stat, value, sampleRate, tags, callback) {
        this.client.unique(stat, value, sampleRate, Deux.format(tags), callback);
    };
    Deux.prototype.close = function (callback) {
        this.client.close(callback);
    };
    /**
     * Send an event
     */
    Deux.prototype.event = function (title, text, options, tags, callback) {
        this.client.event(title, text, options, Deux.format(tags), callback);
    };
    /**
     * Send a service check
     */
    Deux.prototype.check = function (name, status, options, tags, callback) {
        this.client.check(name, status, options, Deux.format(tags), callback);
    };
    return Deux;
}());
exports.default = Deux;
