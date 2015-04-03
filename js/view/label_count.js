import React from 'react';

export default React.createClass({
  render: function() {
    let success = this.props.success;
    let spanClass = 'btn btn-' + (success ? 'success' : 'danger');
    return (
      <span className="card-count">
        <span className={spanClass}>
          {this.props.name} <span className="badge">{this.props.count}</span>
        </span>
      </span>
    );
  }
});
