var React = require('react'),
    UserStore = require('../stores/user'),
    ApiUtil = require('../util/api_util'),
    UpdateUser = require('./update_user');

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
      return <div>User not found!</div>;
    }

    if (this.state.updateUser) {
      updateUserModal =
        <UpdateUser toggle={this._toggleUpdateUser} user={user}/>;
    }

    return (
      <main className="profile">
        {updateUserModal}
        <header className="profile-header group">
          <h1 className="profile-username">{user.username}</h1>
        </header>
        <section className="profile-content">
          <nav className="profile-nav group">
            <button className="update-user" onClick={this._toggleUpdateUser}>Edit</button>
          </nav>

          { React.cloneElement(this.props.children,  { user: user }) }
        </section>
      </main>
    );
  },

  _onChange: function () {
    var user = UserStore.find(this.props.params.id);
    this.setState({ user: user, updateUser: false });
  },

  _toggleUpdateUser: function (e) {
    e.preventDefault();
    this.setState({ updateUser: !this.state.updateUser });
  }
});
