define(["exports", "lodash"], function (exports, _lodash) {

  /**
   * @param {Object} collection looks something like
   *
   *     {
   *       main: {
   *         id_1: {
   *           card: {},  // mtgdb card
   *           count: 3
   *         }
   *       },
   *       side: {
   *       }
   *     }
   */
  "use strict";

  exports.encode = encode;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _ = _lodash;

  function encode(deck) {
    var result = "";
    var main = deck.main;
    var side = deck.side;
    _.forEach(main, function (item) {
      var card = item.card;
      var count = item.count;
      result += count + " " + card.name + "\n";
    });

    _.forEach(side, function (item) {
      var card = item.card;
      var count = item.count;
      result += "SB: " + count + " " + card.name + "\n";
    });

    result += "\n";

    return result;
  }
});