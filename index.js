"use strict";

var bunyan   = require("bunyan"),
    strftime = require("strftime"),
    bFormat  = require("bunyan-format");

var DATE_FORMAT = "%Y-%m-%d-%H-%M-%S";

var loggers = {};

var formatter = bFormat();

module.exports = function createLogger(name, stdoutLevel) {
  name = name || "index";
  stdoutLevel = stdoutLevel || "trace";

  if(!loggers[name]) {
    loggers[name] = bunyan.createLogger({
      name: name,
      streams: [
        {
          level: stdoutLevel,
          stream: formatter
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