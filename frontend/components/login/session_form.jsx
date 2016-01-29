var React = require('react'),
    History = require('react-router').History,
    LinkState = require('react-addons-linked-state-mixin'),
    SessionsApiUtil = require('../../util/sessions_api_util'),
    ModalActions = require('../../actions/modal_actions');

module.exports = React.createClass({
  mixins: [History, LinkState],

  getInitialState: function () {
    return { username: "", password: "" };
  },

  render: function() {
    return (
      <div className="modal" onClick={this._onCancel}>
        <div className="modal-container" onClick={this._stopPropogation}>


          <form onSubmit={ this._onSubmit } className="login-form">
            <h1>Logn In!</h1>

            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              valueLink={this.linkState('username')} />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              valueLink={this.linkState('password')} />

            <button>Log In!</button>
          </form>

        </div>
      </div>
    );
  },

  _onCancel: function () {
    ModalActions.destroyModal();
  },

  _onGuestSubmit: function () {
    SessionsApiUtil.login(
      { username: "secret-guest-account", password: "password" },
      function () {
        this.history.pushState({}, "/");
      }.bind(this)
    );
  },

  _onSubmit: function (e) {
    e.preventDefault();

    SessionsApiUtil.login(this.state, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  }

});
