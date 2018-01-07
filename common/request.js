"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var logger_1 = require("./logger");
var Request = /** @class */ (function () {
    function Request() {
        this.responseBody = "";
        if (typeof XMLHttpRequest === "function" || typeof window !== "undefined") {
            logger_1.logger.info('Using browser "XMLHttpRequest" module');
            this.request = new XMLHttpRequest();
        }
        else if (typeof window === "undefined") {
            logger_1.logger.info('Using Node "HTTP" module');
            this.httpRequest = require("http");
            this.httpsRequest = require("https");
        }
        else {
            logger_1.logger.info("Unable to determine runtime environment");
        }
    }
    Request.prototype.send = function (method, url, body) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (typeof window === "undefined") {
                var opts = url_1.parse(url);
                opts.method = method;
                opts.headers = {
                    "Content-Type": "application/json",
                    "X-Pact-Mock-Service": "true",
                };
                logger_1.logger.info("Sending request with opts: " + JSON.stringify(opts));
                var req = opts.protocol === "https:" ? _this.httpsRequest : _this.httpRequest;
                var request = req.request(opts, function (response) {
                    response.setEncoding("utf8");
                    response.on("data", function (data) { _this.responseBody += data; });
                    response.on("end", function () {
                        if (response.statusCode >= 200 && response.statusCode < 400) {
                            logger_1.logger.info("Resolving promise with: " + _this.responseBody);
                            resolve(_this.responseBody);
                        }
                        else {
                            logger_1.logger.info("Rejecting promise with: " + _this.responseBody);
                            reject(_this.responseBody);
                        }
                    });
                });
                request.on("error", function (err) {
                    logger_1.logger.info("Rejecting promise with: " + err);
                    reject(err);
                });
                if (body) {
                    request.write(body);
                }
                request.end();
            }
            else {
                var req_1 = _this.request;
                req_1.onload = function () {
                    if (req_1.status >= 200 && req_1.status < 400) {
                        logger_1.logger.info("Resolving promise with: " + req_1.responseText);
                        resolve(req_1.responseText);
                    }
                    else {
                        logger_1.logger.info("Rejecting promise with: " + req_1.responseText);
                        reject(req_1.responseText);
                    }
                };
                req_1.onerror = function (err) {
                    logger_1.logger.info("Rejecting promise with: " + err);
                    reject(err);
                };
                req_1.open(method, url, true);
                req_1.setRequestHeader("X-Pact-Mock-Service", "true");
                req_1.setRequestHeader("Content-Type", "application/json");
                req_1.send(body);
            }
        });
    };
    return Request;
}());
exports.Request = Request;
//# sourceMappingURL=request.js.map