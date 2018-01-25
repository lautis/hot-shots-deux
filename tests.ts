import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";

import { StatsD } from "hot-shots";
import Deux from "./index";


describe("Deux", () => {
  describe(".format", () => {
    it("formats tags to list", () => {
      expect(Deux.format({ foo: "bar" })).to.deep.equal(["foo:bar"]);
    });

    it("sanitises tags with reserved characters", () => {
      expect(Deux.format({ "foo@foo": "bar:bar:bar@bar" })).to.deep.equal([
        "foo_foo:bar_bar_bar_bar"
      ]);
    });

    it("returns undefined when input is undedined", () => {
      expect(Deux.format(undefined)).to.equal(undefined);
    })
  });

  describe("wrapper", () => {
    let statsd: StatsD;
    let deux: Deux;

    beforeEach(() => {
      statsd = new StatsD({ mock: true });
      deux = new Deux(statsd);
    });

    it("sends increment to underlying implementation", () => {
      const spy = sinon.spy()
      statsd.increment = spy;
      deux.increment("stat", 1, 1, { foo: "bar"});
      expect(spy.calledWith("stat", 1, 1, ["foo:bar"])).to.equal(true);
    });

    it("sends decrement to underlying implementation", () => {
      const spy = sinon.spy()
      statsd.decrement = spy;
      deux.decrement("stat", 1, 1, { foo: "bar"});
      expect(spy.calledWith("stat", 1, 1, ["foo:bar"])).to.equal(true);
    });

    it("sends timing to underlying implementation", () => {
      const spy = sinon.spy()
      statsd.timing = spy;
      deux.timing("stat", 1, 1);
      expect(spy.calledWith("stat", 1, 1, undefined)).to.equal(true);
    });

    it("sends histogram to underlying implementation", () => {
      const spy = sinon.spy()
      statsd.histogram = spy;
      deux.histogram("stat", 1, 1, { foo: "bar"});
      expect(spy.calledWith("stat", 1, 1, ["foo:bar"])).to.equal(true);
    });

    it("sends gauge to underlying implementation", () => {
      const spy = sinon.spy()
      statsd.gauge = spy;
      deux.gauge("stat", 1, 1, { foo: "bar"});
      expect(spy.calledWith("stat", 1, 1, ["foo:bar"])).to.equal(true);
    });

    it("sends set to underlying implementation", () => {
      const spy = sinon.spy()
      statsd.set = spy;
      deux.set("stat", 1, 1, { foo: "bar"});
      expect(spy.calledWith("stat", 1, 1, ["foo:bar"])).to.equal(true);
    });

    it("sends unique to underlying implementation", () => {
      const spy = sinon.spy()
      statsd.unique = spy;
      deux.unique("stat", 1, 1, { foo: "bar"});
      expect(spy.calledWith("stat", 1, 1, ["foo:bar"])).to.equal(true);
    });

    it("sends event to underlying implementation", () => {
      const spy = sinon.spy()
      statsd.event = spy;
      deux.event("title", "text", undefined, { foo: "bar"});
      expect(spy.calledWith("title", "text", undefined, ["foo:bar"])).to.equal(true);
    });

    it("sends close to underlying implementation", () => {
      const spy = sinon.spy()
      statsd.close = spy;
      const callback = () => {};
      deux.close(callback);
      expect(spy.calledWith(callback)).to.equal(true);
    });
  })
});
