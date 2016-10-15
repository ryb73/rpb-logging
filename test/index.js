"use strict";

const assert = require("chai").assert;

it("can be required", function() {
    let log = require("..");
    assert.ok(log);
});