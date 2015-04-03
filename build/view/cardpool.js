define(["exports", "module", "lodash", "react", "./card", "../mtgdb"], function (exports, module, _lodash, _react, _card, _mtgdb) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _ = _lodash;

  var React = _interopRequire(_react);

  var Card = _interopRequire(_card);

  var mtgdb = _mtgdb;
  module.exports = React.createClass({
    displayName: "cardpool",

    getInitialState: function getInitialState() {
      return { cards: [] };
    },

    componentWillReceiveProps: function componentWillReceiveProps(props) {
      var search = props.search;
      if (!search || search === this.props.search || search.length < 3) {
        return;
      }

      this._search(search);
    },

    render: function render() {
      var _this = this;

      var cards = this.state.cards;
      return React.createElement(
        "div",
        { className: "cardpool" },
        cards.map(function (card) {
          return React.createElement(Card, { info: card,
            increment: _this.props.increment.bind(null, card),
            decrement: _this.props.decrement.bind(null, card) });
        })
      );
    },

    _search: _.debounce(function callee$0$0(name) {
      var _this = this;

      var res;
      return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
          case 0:
            context$1$0.next = 2;
            return mtgdb.search(name);

          case 2:
            res = context$1$0.sent;

            _this.setState({ cards: res });

          case 4:
          case "end":
            return context$1$0.stop();
        }
      }, null, this);
    }, 500)
  });
});