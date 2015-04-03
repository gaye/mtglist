define(["exports", "module", "react"], function (exports, module, _react) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var React = _interopRequire(_react);

  module.exports = React.createClass({
    displayName: "label_count",

    render: function render() {
      var success = this.props.success;
      var spanClass = "btn btn-" + (success ? "success" : "danger");
      return React.createElement(
        "span",
        { className: "card-count" },
        React.createElement(
          "span",
          { className: spanClass },
          this.props.name,
          " ",
          React.createElement(
            "span",
            { className: "badge" },
            this.props.count
          )
        )
      );
    }
  });
});