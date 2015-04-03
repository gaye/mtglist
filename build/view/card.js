define(["exports", "module", "react", "../mtgdb"], function (exports, module, _react, _mtgdb) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var React = _interopRequire(_react);

  var imageUrl = _mtgdb.imageUrl;
  module.exports = React.createClass({
    displayName: "card",

    render: function render() {
      var style = { backgroundImage: "url(" + imageUrl(this.props.info.id) + ")" };
      return React.createElement(
        "div",
        { className: "card",
          style: style,
          title: this.props.info.description },
        React.createElement(
          "div",
          { className: "card-count" },
          this.props.count || ""
        ),
        React.createElement(
          "div",
          { className: "btn-group card-controls" },
          React.createElement(
            "button",
            { className: "btn btn-success", onClick: this.props.increment },
            React.createElement("span", { className: "glyphicon glyphicon-plus" })
          ),
          React.createElement(
            "button",
            { className: "btn btn-danger", onClick: this.props.decrement },
            React.createElement("span", { className: "glyphicon glyphicon-minus" })
          )
        )
      );
    }
  });
});