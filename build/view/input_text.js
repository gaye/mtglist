define(["exports", "module", "react"], function (exports, module, _react) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var React = _interopRequire(_react);

  module.exports = React.createClass({
    displayName: "input_text",

    render: function render() {
      return React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "label",
          { htmlFor: this.props.inputId },
          this.props.inputLabel
        ),
        React.createElement("input", { type: "text",
          className: "form-control",
          id: this.props.inputId,
          value: this.props.value,
          onChange: this.props.handleChange })
      );
    }
  });
});