var React = require('react'),
    History = require('react-router').History,
    ModalStore = require('../../stores/modal'),
    ModalActions = require('../../actions/modal_actions'),
    SessionForm = require('./session_form'),
    NewUserForm = require('../user/new_form'),
    SessionsApiUtil = require('../../util/sessions_api_util'),
    Explore = require('../track/explore');

module.exports = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { modal: null };
  },

  componentDidMount: function () {
    this.onModalToken = ModalStore.addListener(this._onModal);
  },

  componentWillUnmount: function () {
    this.onModalToken.remove();
  },

  render: function () {
    return (
      <main className="login main">
        {this.state.modal}
        <header className="login-header">
          <div className="group">

            <figure className="login-sheep"></figure>
            <span className="soundclone">SOUNDCLONE</span>

            <div className="login-buttons">

              <button className="guest" onClick={this._guestLogin}>
                Guest
              </button>

              <button className="sign-in" onClick={this._sessionModal} >
                Sign In
              </button>

              <button className="create" onClick={this._newUserModal}>
                Create Account
              </button>

            </div>
          </div>
        </header>

        <Explore />
      </main>
    );
  },

  _guestLogin: function (e) {
    e.preventDefault();

    SessionsApiUtil.login(
      { email: "composerinteralia@example.com", password: "password" },
      function () {
        this.history.pushState({}, "/");
      }.bind(this)
    );
  },

  _onModal: function () {
    var modal = ModalStore.get();
    this.setState({ modal: modal });
  },

  _sessionModal: function () {
    var modal = <SessionForm />;
    ModalActions.receiveModal(modal);
  },

  _newUserModal: function () {
    var modal = (<NewUserForm />);
    ModalActions.receiveModal(modal);
  }
});
