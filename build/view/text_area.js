define(["exports", "module", "react"], function (exports, module, _react) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var React = _interopRequire(_react);

  module.exports = React.createClass({
    displayName: "text_area",

    render: function render() {
      return React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "label",
          { htmlFor: this.props.textAreaId },
          this.props.textAreaLabel
        ),
        React.createElement("textarea", { className: "form-control",
          id: this.props.textAreaId,
          rows: "3",
          value: this.props.value,
          onChange: this.props.handleChange })
      );
    }
  });
});