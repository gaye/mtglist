define(["exports", "module", "lodash", "react", "./cardpool", "./deck", "./input_text", "./label_count", "./text_area", "dec"], function (exports, module, _lodash, _react, _cardpool, _deck, _input_text, _label_count, _text_area, _dec) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _ = _lodash;

  var React = _interopRequire(_react);

  var Cardpool = _interopRequire(_cardpool);

  var Deck = _interopRequire(_deck);

  var InputText = _interopRequire(_input_text);

  var LabelCount = _interopRequire(_label_count);

  var TextArea = _interopRequire(_text_area);

  var dec = _dec;
  module.exports = React.createClass({
    displayName: "editor",

    getInitialState: function getInitialState() {
      return {
        deck: {
          metadata: { name: "Untitled", format: "Standard", notes: "" },
          main: {},
          side: {}
        },

        search: { card: "" }
      };
    },

    render: function render() {
      var deck = this.state.deck;
      var metadata = deck.metadata;
      var search = this.state.search;
      return React.createElement(
        "div",
        { className: "editor" },
        React.createElement(Cardpool, { search: search.card,
          increment: this._increment,
          decrement: this._decrement }),
        React.createElement(Deck, { main: deck.main,
          side: deck.side,
          increment: this._increment,
          decrement: this._decrement }),
        React.createElement(
          "div",
          { className: "metadata" },
          React.createElement(
            "form",
            null,
            React.createElement(InputText, { inputId: "nameInput",
              inputLabel: "Name",
              value: metadata.name,
              handleChange: this._onNameChange }),
            React.createElement(InputText, { inputId: "formatInput",
              inputLabel: "Format",
              value: metadata.format,
              handleChange: this._onFormatChange }),
            React.createElement(TextArea, { textAreaId: "notesInput",
              textAreaLabel: "Notes",
              value: metadata.notes,
              handleChange: this._onNotesChange }),
            React.createElement(InputText, { inputId: "cardInput",
              inputLabel: "Card Name",
              handleChange: this._onCardChange })
          ),
          React.createElement(
            "div",
            { className: "card-count-container" },
            React.createElement(LabelCount, { name: "main",
              count: this._mainCount(),
              success: this._mainCount() >= 60 }),
            React.createElement(LabelCount, { name: "side",
              count: this._sideCount(),
              success: this._sideCount() <= 15 })
          ),
          React.createElement(
            "div",
            { className: "actions-container" },
            React.createElement(
              "a",
              { href: this._downloadUrl(), download: metadata.name + ".dec" },
              React.createElement("span", { className: "glyphicon glyphicon-cloud-download" })
            )
          )
        )
      );
    },

    _onNameChange: function _onNameChange(event) {
      var deck = this.state.deck;
      deck.metadata.name = event.target.value;
      this.setState({ deck: deck });
    },

    _onFormatChange: function _onFormatChange(event) {
      var deck = this.state.deck;
      deck.metadata.format = event.target.value;
      this.setState({ deck: deck });
    },

    _onNotesChange: function _onNotesChange(event) {
      var deck = this.state.deck;
      deck.metadata.notes = event.target.value;
      this.setState({ deck: deck });
    },

    _onCardChange: function _onCardChange(event) {
      var search = this.state.search;
      search.card = event.target.value;
      this.setState({ search: search });
    },

    _increment: function _increment(card) {
      var id = card.id;
      var deck = this.state.deck;
      if (id in deck.main) {
        deck.main[id].count += 1;
      } else {
        deck.main[id] = { card: card, count: 1 };
      }

      this.setState({ deck: deck });
    },

    _decrement: function _decrement(card) {
      var id = card.id;
      var deck = this.state.deck;
      if (id in deck.main) {
        deck.main[id].count -= 1;
        if (deck.main[id].count <= 0) {
          delete deck.main[id];
        }

        this.setState({ deck: deck });
      }
    },

    _mainCount: function _mainCount() {
      return cardCount(this.state.deck.main);
    },

    _sideCount: function _sideCount() {
      return cardCount(this.state.deck.side);
    },

    _downloadUrl: function _downloadUrl() {
      var deck = this.state.deck;
      var contents = dec.encode(deck);
      var blob = new Blob([contents], { type: "text/plain" });
      return URL.createObjectURL(blob);
    }
  });

  function cardCount(collection) {
    if (_.isEmpty(collection)) {
      return 0;
    }

    return _.map(collection, function (value) {
      return value.count;
    }).reduce(function (a, b) {
      return a + b;
    });
  }
});