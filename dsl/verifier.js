"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Provider Verifier service
 * @module ProviderVerifier
 */
var pact_node_1 = require("@pact-foundation/pact-node");
var es6_promise_1 = require("es6-promise");
var Verifier = /** @class */ (function () {
    function Verifier() {
    }
    Verifier.prototype.verifyProvider = function (opts) {
        return new es6_promise_1.Promise(function (resolve, reject) {
            pact_node_1.default.verifyPacts(opts)
                .then(function (value) { return resolve(value); }, function (error) { return reject(error); });
        });
    };
    return Verifier;
}());
exports.Verifier = Verifier;
//# sourceMappingURL=verifier.js.map