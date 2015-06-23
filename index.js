"use strict";

var bunyan   = require("bunyan"),
    strftime = require("strftime");

var DATE_FORMAT = "%Y-%m-%d-%H-%M-%S";

var loggers = {};

module.exports = function createLogger(name) {
  name = name || "index";

  if(!loggers[name]) {
    loggers[name] = bunyan.createLogger({
      name: name,
      streams: [
        {
          level: "trace",
          stream: process.stdout
        },
        {
          level: "debug",
          path: "log/" + strftime(DATE_FORMAT) + ".log"
        },
        {
          level: "error",
          path: "log/error/" + strftime(DATE_FORMAT) + ".log"
        }
      ]
    });
  }

  return loggers[name];
};