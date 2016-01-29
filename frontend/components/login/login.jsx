var React = require('react'),
    History = require('react-router').History,
    ModalStore = require('../../stores/modal'),
    ModalActions = require('../../actions/modal_actions'),
    SessionForm = require('./session_form'),
    SessionsApiUtil = require('../../util/sessions_api_util');

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
              <button className="guest" onClick={this._guestLogin}>Guest</button>
              <button className="sign-in" onClick={this._session} >Sign In</button>
              <button className="create">Create Account</button>
            </div>
          </div>
        </header>
      </main>
    );
  },

  _onModal: function () {
    var modal = ModalStore.get();
    this.setState({ modal: modal });
  },

  _session: function () {
    var modal = <SessionForm />;
    ModalActions.receiveModal(modal);
  },

  _guestLogin: function (e) {
    e.preventDefault();

    SessionsApiUtil.login(
      { username: "secret-guest-account", password: "password" },
      function () {
        this.history.pushState({}, "/");
      }.bind(this)
    );
  }
});
