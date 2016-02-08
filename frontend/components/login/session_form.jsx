var React = require('react'),
    History = require('react-router').History,
    LinkState = require('react-addons-linked-state-mixin'),
    SessionsApiUtil = require('../../util/sessions_api_util'),
    ModalActions = require('../../actions/modal_actions'),
    ModalSpinner = require('../modal_spinner');

module.exports = React.createClass({
  mixins: [History, LinkState],

  getInitialState: function () {
    return {
      email: "",
      password: "",
      submitted: false
    };
  },

  render: function() {
    if (this.state.submitted) {
      return <ModalSpinner/>;
    }

    return (
      <div className="modal" onClick={this._cancel}>
        <div className="modal-container small" onClick={this._stopPropogation}>

          <a className="facebook" href="/auth/facebook"><div></div></a>

          <div className="email-login group">
            <span>or</span>

            <div className="login-form">
              <form onSubmit={ this._submit } >

                <label htmlFor="email">Your email address</label>
                <input
                  id="email"
                  type="text"
                  valueLink={this.linkState('email')} />

                <label htmlFor="password">Your password</label>
                <input
                  id="password"
                  type="password"
                  valueLink={this.linkState('password')} />

                <input
                  type="submit"
                  className="hidden-submit"
                  tabIndex="-1" >
                </input>

              </form>

              <button onClick={this._submit} className="submit">Log In!</button>
              <button onClick={this._cancel} className="cancel">Cancel</button>
            </div>

          </div>

        </div>
      </div>
    );
  },

  _cancel: function () {
    ModalActions.destroyModal();
  },

  _submit: function (e) {
    e.preventDefault();

    this.setState({ submitted: true })

    SessionsApiUtil.login(this.state, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  }
});
