var React = require('react');

module.exports = React.createClass({
  render: function () {
    var username = this.props.params.username;
    return (
      <main className="profile">
        <header className="profile-header group">
          <h1 className="profile-username">{username}</h1>
        </header>
      </main>
    );
  }
});
