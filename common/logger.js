"use strict";
/* tslint:disable:no-console */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Logger module.
 * @module logger
 * @private
 */
var config_1 = require("./config");
var logger = {
    info: function (msg) {
        if (config_1.config.logging) {
            console.log(msg);
        }
    },
    warn: function (msg) {
        if (config_1.config.logging) {
            console.warn(msg);
        }
    },
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map