var React = require('react'),
    Navbar = require('./navbar'),
    Playbar = require('./playbar');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Playbar />
      </div>
    );
  }
});
