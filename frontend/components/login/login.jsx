var React = require('react'),
    History = require('react-router').History,
    ModalStore = require('../../stores/modal'),
    ModalActions = require('../../actions/modal_actions'),
    SessionsApiUtil = require('../../util/sessions_api_util'),
    SessionForm = require('./session_form'),
    NewUserForm = require('../user/new_form'),
    Explore = require('../track/explore'),
    Playbar = require('../playbar');

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
      <div>
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

        <Playbar />
      </div>
    );
  },

  _guestLogin: function () {
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
