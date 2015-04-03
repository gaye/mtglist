define(["exports", "module", "lodash", "react", "./card"], function (exports, module, _lodash, _react, _card) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _ = _lodash;

  var React = _interopRequire(_react);

  var Card = _interopRequire(_card);

  module.exports = React.createClass({
    displayName: "deck",

    render: function render() {
      var _this = this;

      return React.createElement(
        "div",
        { className: "deck" },
        _.map(this.props.main, function (item, id) {
          var card = item.card;
          var count = item.count;
          return React.createElement(Card, { info: card,
            count: count,
            increment: _this.props.increment.bind(null, card),
            decrement: _this.props.decrement.bind(null, card) });
        })
      );
    }
  });
});