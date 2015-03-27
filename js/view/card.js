define((require, exports, module) => {
'use strict';

let React = require('react');
let mtgdb = require('../mtgdb');

module.exports = React.createClass({
  render: function() {
    let style = { backgroundImage: 'url(' + mtgdb.imageUrl(this.props.info.id) + ')' };
    return (
      <div className="card"
           style={style}
           title={this.props.info.description}>
        <div className="btn-group card-controls">
          <button className="btn btn-success">
            <span className="glyphicon glyphicon-plus"></span>
          </button>
          <button className="btn btn-danger">
            <span className="glyphicon glyphicon-minus"></span>
          </button>
        </div>
      </div>
    );
  }
});

});
