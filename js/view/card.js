import React from 'react';
import { imageUrl } from '../mtgdb';

export default React.createClass({
  render: function() {
    let style = { backgroundImage: 'url(' + imageUrl(this.props.info.id) + ')' };
    return (
      <div className="card"
           style={style}
           title={this.props.info.description}>
        <div className="card-count">{this.props.count || ''}</div>
        <div className="btn-group card-controls">
          <button className="btn btn-success" onClick={this.props.increment}>
            <span className="glyphicon glyphicon-plus"></span>
          </button>
          <button className="btn btn-danger" onClick={this.props.decrement}>
            <span className="glyphicon glyphicon-minus"></span>
          </button>
        </div>
      </div>
    );
  }
});
