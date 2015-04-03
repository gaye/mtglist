define(["exports", "lodash", "./xhr"], function (exports, _lodash, _xhr) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  exports.getCard = getCard;
  exports.imageUrl = imageUrl;
  exports.search = search;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _ = _lodash;

  var Xhr = _interopRequire(_xhr);

  var BASE_URL = "http://api.mtgdb.info";

  function getCard(id) {
    var url, xhr, json;
    return regeneratorRuntime.async(function getCard$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          url = BASE_URL + "/cards/" + id;
          xhr = new Xhr();

          xhr.open("GET", url, true /* async */);
          context$1$0.next = 5;
          return xhr.send();

        case 5:
          json = context$1$0.sent;
          return context$1$0.abrupt("return", JSON.parse(json));

        case 7:
        case "end":
          return context$1$0.stop();
      }
    }, null, this);
  }

  function imageUrl(id) {
    return BASE_URL + "/content/card_images/" + id + ".jpeg";
  }

  function search(text) {
    var url, xhr, json, res, nameToCards;
    return regeneratorRuntime.async(function search$(context$1$0) {
      while (1) switch (context$1$0.prev = context$1$0.next) {
        case 0:
          url = BASE_URL + "/search/" + text;
          xhr = new Xhr();

          xhr.open("GET", url, true /* async */);
          context$1$0.next = 5;
          return xhr.send();

        case 5:
          json = context$1$0.sent;
          res = JSON.parse(json);
          nameToCards = _.groupBy(res, "name");

          _.forEach(nameToCards, function (cards, name) {
            nameToCards[name] = _.sortBy(cards, "id")[0];
          });

          return context$1$0.abrupt("return", _.values(nameToCards));

        case 10:
        case "end":
          return context$1$0.stop();
      }
    }, null, this);
  }
});