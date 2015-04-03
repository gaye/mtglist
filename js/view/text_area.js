import React from 'react';

export default React.createClass({
  render: function() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.textAreaId}>{this.props.textAreaLabel}</label>
        <textarea className="form-control"
                  id={this.props.textAreaId}
                  rows="3"
                  value={this.props.value}
                  onChange={this.props.handleChange}>
        </textarea>
      </div>
    );
  }
});
