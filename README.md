# Hot Shots Deux

Wrapper for [hot-shots](https://github.com/brightcove/hot-shots) statsd client that adds key-value telegraf tags handling.

[![Build Status](https://travis-ci.org/lautis/hot-shots-deux.svg?branch=master)](https://travis-ci.org/lautis/hot-shots-deux)

## Usage

```js
var StatsD = require('hot-shots'),
var Deux = require('hot-shots-deux').default;
var client = new Deux(new StatsD());
client.increment("metric", 1, 1, { "key": "value" });
```

If the tags contain a reserved character (`:`, `|`, `@`), that will be replaced with an underscore (`_`).

All functionality from hot-shots should be implemented in the wrapper class.

## Name

Why is this project named hot-shots-deux? Because:

* Hot Shots Part Deux is a much better movie than Hot Shots
