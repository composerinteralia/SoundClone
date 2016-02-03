var React = require('react'),
    History = require('react-router').History,
    LinkState = require('react-addons-linked-state-mixin'),
    SessionsApiUtil = require('../../util/sessions_api_util'),
    ModalActions = require('../../actions/modal_actions');

module.exports = React.createClass({
  mixins: [History, LinkState],

  getInitialState: function () {
    return { email: "", password: "" };
  },

  render: function() {
    return (
      <div className="modal" onClick={this._cancel}>
        <div className="modal-container" onClick={this._stopPropogation}>
          <h2>Log In</h2>

          <a href="/auth/facebook">Login with Facebook</a>

          <form onSubmit={ this._submit } className="login-form">

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              valueLink={this.linkState('email')} />

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

  _cancel: function () {
    ModalActions.destroyModal();
  },

  _submit: function (e) {
    e.preventDefault();

    SessionsApiUtil.login(this.state, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  }
});
