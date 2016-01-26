var React = require('react'),
    UserStore = require('../stores/user'),
    ApiUtil = require('../util/api_util');

module.exports = React.createClass({
  getInitialState: function () {
    var user = UserStore.find(this.props.params.id);
    return { user: user };
  },

  componentDidMount: function () {
    this.onChangeToken = UserStore.addListener(this._onChange);
    ApiUtil.fetchUser(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
  },

  render: function () {
    var user = this.state.user;

    if (typeof user === "undefined") {
      return <div>Loading...</div>;
    }

    return (
      <main className="profile">
        <header className="profile-header group">
          <h1 className="profile-username">{user.username}</h1>
        </header>
      </main>
    );
  },

  _onChange: function () {
    var user = UserStore.find(this.props.params.id);
    this.setState({ user: user });
  }
});
