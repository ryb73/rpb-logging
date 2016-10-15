"use strict";

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

const bunyan    = require("bunyan"),
      strftime  = require("strftime"),
      formatter = require("bunyan-format")(),
      config    = require("config");

config.util.setModuleDefaults("rpb-logging", {
  stdoutLevel: "trace",
  outputToFile: false,
});

const loggerConfig = config.get("rpb-logging");

const DATE_FORMAT = "%Y-%m-%d-%H-%M-%S";

const loggers = {};

module.exports = function createLogger(name) {
  name = name || "index";

  if(!loggers[name]) {
    let streams = [{
      level: loggerConfig.stdoutLevel,
      stream: formatter
    }];

    if(loggerConfig.outputToFile) {
      streams.push({
        level: "debug",
        path: "log/" + strftime(DATE_FORMAT) + ".log"
      });

      streams.push({
        level: "error",
        path: "log/error/" + strftime(DATE_FORMAT) + ".log"
      });
    }

    loggers[name] = bunyan.createLogger({ name, streams });
  }

  return loggers[name];
};