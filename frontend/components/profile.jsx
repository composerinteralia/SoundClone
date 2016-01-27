var React = require('react'),
    UserStore = require('../stores/user'),
    ApiUtil = require('../util/api_util'),
    UserUpdateForm = require('./user_update_form');

module.exports = React.createClass({
  getInitialState: function () {
    var user = UserStore.find(this.props.params.id);
    return { user: user, updateUser: false };
  },

  componentDidMount: function () {
    this.onChangeToken = UserStore.addListener(this._onChange);
    ApiUtil.fetchUser(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
  },

  render: function () {
    var updateUserModal, user = this.state.user;

    if (typeof user === "undefined") {
      return <div>Loading...</div>;
    }

    if (this.state.updateUser) {
      updateUserModal =
        <UserUpdateForm toggle={this._toggleUpdateUser} user={user}/>
    }

    return (
      <main className="profile">
        {updateUserModal}
        <header className="profile-header group">
          <h1 className="profile-username">{user.username}</h1>
        </header>
        <div className="user-buttons">
          <button className="update-user" onClick={this._toggleUpdateUser}>Edit</button>
        </div>
      </main>
    );
  },

  _onChange: function () {
    var user = UserStore.find(this.props.params.id);
    this.setState({ user: user });
  },

  _toggleUpdateUser: function (e) {
    e.preventDefault();

    this.setState({ updateUser: !this.state.updateUser })
  }
});
