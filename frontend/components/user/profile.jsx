var React = require('react'),
    UserStore = require('../../stores/user'),
    ModalStore = require('../../stores/modal'),
    ModalActions = require('../../actions/modal_actions'),
    ApiUtil = require('../../util/api_util'),
    UpdateUser = require('./update');

module.exports = React.createClass({
  getInitialState: function () {
    var user = UserStore.find(this.props.params.id),
        modal = ModalStore.fetch();

    return { user: user, modal: modal };
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

    return (
      <main className="profile">
        {this.state.modal}
        <header className="profile-header group">
          <h1 className="profile-username">{user.username}</h1>
        </header>
        <section className="profile-content">
          <nav className="profile-nav group">
            <button className="update-user" onClick={this._updateUser}>Edit</button>
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
    var modal = ModalStore.fetch();
    this.setState({ modal: modal });
  },

  _updateUser: function (e) {
    e.preventDefault();
    var modal = <UpdateUser user={this.state.user}/>;
    ModalActions.receiveModal(modal);
  }
});
