var React = require('react');

module.exports = React.createClass({
  render: function () {
    var track = this.props.track;
    return (
      <li className="user-track">
        {track.title}
        <button>Edit</button>
        <button>Delete</button>
      </li>
    );
  }
});
