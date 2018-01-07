"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Pact module.
 * @module Pact
 */
var pact_node_1 = require("@pact-foundation/pact-node");
var clc = require("cli-color");
var lodash_1 = require("lodash");
var path = require("path");
var process = require("process");
var logger_1 = require("./common/logger");
var net_1 = require("./common/net");
var interaction_1 = require("./dsl/interaction");
var mockService_1 = require("./dsl/mockService");
/**
 * Creates a new {@link PactProvider}.
 * @memberof Pact
 * @name create
 * @param {PactOptions} opts
 * @return {@link PactProvider}
 */
var Pact = /** @class */ (function () {
    function Pact(config) {
        this.opts = Pact.createOptionsWithDefaults(config);
        if (lodash_1.isEmpty(this.opts.consumer)) {
            throw new Error("You must specify a Consumer for this pact.");
        }
        if (lodash_1.isEmpty(this.opts.provider)) {
            throw new Error("You must specify a Provider for this pact.");
        }
        pact_node_1.default.logLevel(this.opts.logLevel);
        this.server = pact_node_1.default.createServer({
            consumer: this.opts.consumer,
            cors: this.opts.cors,
            dir: this.opts.dir,
            host: this.opts.host,
            log: this.opts.log,
            pactFileWriteMode: this.opts.pactfileWriteMode,
            port: this.opts.port,
            provider: this.opts.provider,
            spec: this.opts.spec,
            ssl: this.opts.ssl,
            sslcert: this.opts.sslcert,
            sslkey: this.opts.sslkey,
        });
        logger_1.logger.info("Setting up Pact with Consumer \"" + this.opts.consumer + "\" and Provider \"" + this.opts.provider + "\"\n   using mock service on Port: \"" + this.opts.port + "\"");
        this.mockService = new mockService_1.MockService(undefined, undefined, this.opts.port, this.opts.host, this.opts.ssl, this.opts.pactfileWriteMode);
    }
    Pact.createOptionsWithDefaults = function (opts) {
        return __assign({}, Pact.defaults, opts);
    };
    /**
     * Start the Mock Server.
     * @returns {Promise}
     */
    Pact.prototype.setup = function () {
        var _this = this;
        return net_1.isPortAvailable(this.opts.port, this.opts.host).then(function () { return _this.server.start(); });
    };
    /**
     * Add an interaction to the {@link MockService}.
     * @memberof PactProvider
     * @instance
     * @param {Interaction} interactionObj
     * @returns {Promise}
     */
    Pact.prototype.addInteraction = function (interactionObj) {
        var interaction = new interaction_1.Interaction();
        if (interactionObj.state) {
            interaction.given(interactionObj.state);
        }
        interaction
            .uponReceiving(interactionObj.uponReceiving)
            .withRequest(interactionObj.withRequest)
            .willRespondWith(interactionObj.willRespondWith);
        return this.mockService.addInteraction(interaction);
    };
    /**
     * Checks with the Mock Service if the expected interactions have been exercised.
     * @memberof PactProvider
     * @instance
     * @returns {Promise}
     */
    Pact.prototype.verify = function () {
        var _this = this;
        return this.mockService.verify()
            .then(function () { return _this.mockService.removeInteractions(); })
            .catch(function (e) {
            // Properly format the error
            /* tslint:disable: no-console */
            console.error("");
            console.error(clc.red("Pact verification failed!"));
            console.error(clc.red(e));
            /* tslint:enable: */
            throw new Error("Pact verification failed - expected interactions did not match actual.");
        });
    };
    /**
     * Writes the Pact and clears any interactions left behind and shutdown the
     * mock server
     * @memberof PactProvider
     * @instance
     * @returns {Promise}
     */
    Pact.prototype.finalize = function () {
        var _this = this;
        if (this.finalized) {
            logger_1.logger.warn("finalize() has already been called, this is probably a logic error in your test setup. " +
                "In the future this will be an error.");
        }
        this.finalized = true;
        return this.mockService.writePact()
            .then(function () { return _this.server.delete(); })
            .catch(function (err) {
            return Promise.all([_this.server.delete(), Promise.reject(err)]);
        });
    };
    /**
     * Writes the pact file out to file. Should be called when all tests have been performed for a
     * given Consumer <-> Provider pair. It will write out the Pact to the
     * configured file.
     * @memberof PactProvider
     * @instance
     * @returns {Promise}
     */
    Pact.prototype.writePact = function () {
        return this.mockService.writePact();
    };
    /**
     * Clear up any interactions in the Provider Mock Server.
     * @memberof PactProvider
     * @instance
     * @returns {Promise}
     */
    Pact.prototype.removeInteractions = function () {
        return this.mockService.removeInteractions();
    };
    Pact.defaults = {
        consumer: "",
        cors: false,
        dir: path.resolve(process.cwd(), "pacts"),
        host: "127.0.0.1",
        log: path.resolve(process.cwd(), "logs", "pact.log"),
        logLevel: "info",
        pactfileWriteMode: "overwrite",
        port: 1234,
        provider: "",
        spec: 2,
        ssl: false,
    };
    return Pact;
}());
exports.Pact = Pact;
/**
 * Exposes {@link Verifier}
 * @memberof Pact
 * @static
 */
__export(require("./dsl/verifier"));
/**
 * Exposes {@link Matchers}
 * To avoid polluting the root module's namespace, re-export
 * Matchers as its owns module
 * @memberof Pact
 * @static
 */
var Matchers = require("./dsl/matchers");
exports.Matchers = Matchers;
/**
 * Exposes {@link Interaction}
 * @memberof Pact
 * @static
 */
__export(require("./dsl/interaction"));
/**
 * Exposes {@link MockService}
 * @memberof Pact
 * @static
 */
__export(require("./dsl/mockService"));
//# sourceMappingURL=pact.js.map