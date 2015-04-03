define(["exports", "module"], function (exports, module) {
  "use strict";

  var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var Xhr = (function () {
    function Xhr(options) {
      var _this = this;

      _classCallCheck(this, Xhr);

      this.transport = new XMLHttpRequest(options);

      /* readwrite */
      ["response", "responseText", "responseType", "responseXML", "timeout", "upload", "withCredentials"].forEach(function (attribute) {
        Object.defineProperty(_this, attribute, {
          get: function get() {
            return this.transport[attribute];
          },
          set: function set(value) {
            this.transport[attribute] = value;
          }
        });
      });

      /* readonly */
      ["status", "statusText"].forEach(function (attribute) {
        Object.defineProperty(_this, attribute, {
          get: function get() {
            return this.transport[attribute];
          }
        });
      });
    }

    _createClass(Xhr, {
      abort: {
        value: function abort() {
          return this._callNative("abort", arguments);
        }
      },
      getAllResponseHeaders: {
        value: function getAllResponseHeaders() {
          return this._callNative("getAllResponseHeaders", arguments);
        }
      },
      getResponseHeader: {
        value: function getResponseHeader() {
          return this._callNative("getResponseHeader", arguments);
        }
      },
      open: {
        value: function open() {
          return this._callNative("open", arguments);
        }
      },
      overrideMimeType: {
        value: function overrideMimeType() {
          return this._callNative("overrideMimeType", arguments);
        }
      },
      send: {
        value: function send(data) {
          var transport = this.transport;
          transport.send(data);
          return new Promise(function (resolve, reject) {
            transport.onreadystatechange = function () {
              if (transport.readyState !== 4 /* done */) {
                return;
              }

              if (transport.status < 200 || transport.status >= 400) {
                return reject(new Error("Bad status: " + transport.status));
              }

              return resolve(transport.responseText);
            };

            transport.ontimeout = function () {
              reject(new Error("Request timed out after " + transport.timeout + "ms"));
            };
          });
        }
      },
      _callNative: {
        value: function _callNative(method, args) {
          return this.transport[method].apply(this.transport, args);
        }
      }
    });

    return Xhr;
  })();

  module.exports = Xhr;
});