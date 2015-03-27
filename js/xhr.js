/**
 * @fileoverview Promise wrapper around native xhr api.
 *
 * Usage:
 *
 *   var xhr = new Xhr();
 *   xhr.sandbox = ...;
 *   xhr.open(...);
 *   xhr
 *     .send(...)
 *     .then(function(responseText) {
 *     })
 *     .catch(function(error) {
 *     });
 */
define((require, exports, module) => {
'use strict';

function Xhr(options) {
  this.native = new XMLHttpRequest(options);
  this.sandbox = null;

  /* readwrite */
  [
    'response',
    'responseText',
    'responseType',
    'responseXML',
    'timeout',
    'upload',
    'withCredentials'
  ].forEach(attribute => {
    Object.defineProperty(this, attribute, {
      get: function() { return this.native[attribute]; },
      set: function(value) { this.native[attribute] = value; }
    });
  });

  /* readonly */
  [
    'status',
    'statusText'
  ].forEach(attribute => {
    Object.defineProperty(this, attribute, {
      get: function() { return this.native[attribute]; }
    });
  });
}
module.exports = Xhr;

/* jshint -W040 */
[
  'abort',
  'getAllResponseHeaders',
  'getResponseHeader',
  'open',
  'overrideMimeType',
  'setRequestHeader'
].forEach(method => {
  Xhr.prototype[method] = function() {
    return this.native[method].apply(this.native, arguments);
  };
});
/* jshint +W040 */

Xhr.prototype.send = function(data) {
  if (this.sandbox) {
    this.sandbox.add(this);
  }

  let native = this.native;
  native.send(data);
  return new Promise(function(resolve, reject) {
    native.onreadystatechange = function() {
      if (native.readyState !== 4 /* done */) {
        return;
      }

      if (native.status < 200 || native.status >= 400) {
        return reject(new Error('Bad status: ' + native.status));
      }

      return resolve(native.responseText);
    };

    native.ontimeout = function() {
      reject(new Error('Request timed out after ' + native.timeout + 'ms'));
    };
  });
};

});
