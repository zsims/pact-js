"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Configuration module.
 * @module config
 * @private
 */
var path_1 = require("path");
var process = require("process");
var PACT_CONFIG_FILE = path_1.resolve(process.cwd(), "config", "pact.config.js");
var DEFAULT_PACT_CONFIG = {
    logging: false,
    mockService: {
        host: "127.0.0.1",
        port: 1234,
    },
};
var config;
exports.config = config;
try {
    // tslint:disable:no-var-requires
    exports.config = config = require(PACT_CONFIG_FILE);
}
catch (e) {
    exports.config = config = DEFAULT_PACT_CONFIG;
}
//# sourceMappingURL=config.js.map