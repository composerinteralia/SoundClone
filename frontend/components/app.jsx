var React = require('react'),
    Navbar = require('./navbar'),
    Player = require('./player');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Player />
      </div>
    );
  }
});
