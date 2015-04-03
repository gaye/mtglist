import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.inputId}>{this.props.inputLabel}</label>
        <input type="text"
               className="form-control"
               id={this.props.inputId}
               value={this.props.value}
               onChange={this.props.handleChange} />
      </div>
    );
  }
});
