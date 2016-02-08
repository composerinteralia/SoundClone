var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <ul className="form-errors">
        { this.props.messages.map(function (message, i) {
          return <li key={i}>{message}</li>
        })}
      </ul>
    )
  }
});
