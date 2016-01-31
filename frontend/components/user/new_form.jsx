var React = require('react'),
    History = require('react-router').History,
    LinkState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions');

module.exports = React.createClass({
  mixins: [History, LinkState],

  getInitialState: function () {
    return { username: "", password: "" };
  },

  render: function () {
    return (
      <div className="modal" onClick={this._cancel}>
        <div className="modal-container" onClick={this._stopPropogation}>
          <h2>Create Account</h2>

          <form onSubmit={this._submit} className="user-update-form">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              valueLink={this.linkState('username')}>
            </input>

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              valueLink={this.linkState('password')}>
            </input>

            <input
              type="submit"
              className="hidden-submit"
              tabIndex="-1" >
            </input>
          </form>

          <button className="cancel" onClick={this._cancel}>Cancel</button>
          <button onClick={this._submit}>Sign Up</button>
        </div>
      </div>
    );
  },

  _cancel: function () {
    ModalActions.destroyModal();
  },

  _submit: function () {
    ApiUtil.createUser(this.state, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  }
});
