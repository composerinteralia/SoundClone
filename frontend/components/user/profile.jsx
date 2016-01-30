var React = require('react'),
    UserStore = require('../../stores/user'),
    CurrentUserStore = require('../../stores/current_user'),
    ModalStore = require('../../stores/modal'),
    ModalActions = require('../../actions/modal_actions'),
    ApiUtil = require('../../util/api_util'),
    UpdateUser = require('./update');

module.exports = React.createClass({
  getInitialState: function () {
    var user = UserStore.find(this.props.params.id);
    return { user: user, modal: null };
  },

  componentDidMount: function () {
    this.onChangeToken = UserStore.addListener(this._onChange);
    this.onModalToken = ModalStore.addListener(this._onModal);

    ApiUtil.fetchUser(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
    this.onModalToken.remove();
  },

  render: function () {
    var user = this.state.user;

    if (typeof user === "undefined") {
      return <div>User not found!</div>;
    }

    var editButton;
    if (CurrentUserStore.currentUser().id === user.id) {
        editButton =
          <button className="update-user" onClick={this._updateUser}>
            Edit
          </button>
    }

    return (
      <main className="main">
        {this.state.modal}
        <header className="profile-header group">
          <figure className="profile-image">
            <img src={user.profile_image_url}/>
          </figure>
          <h1 className="profile-username">{user.username}</h1>
        </header>
        <section className="content">
          <nav className="profile-nav group">
            {editButton}
          </nav>

          { React.cloneElement(this.props.children,  { user: user }) }
        </section>
      </main>
    );
  },

  _onChange: function () {
    var user = UserStore.find(this.props.params.id);
    this.setState({ user: user });
  },

  _onModal: function () {
    var modal = ModalStore.get();
    this.setState({ modal: modal });
  },

  _updateUser: function () {
    var modal = <UpdateUser user={this.state.user}/>;
    ModalActions.receiveModal(modal);
  }
});
