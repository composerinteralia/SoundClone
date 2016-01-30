var React = require('react'),
    LinkState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions'),
    CurrentUserStore = require('../../stores/current_user');

module.exports = React.createClass({
  mixins: [LinkState],

  getInitialState: function () {
    // Buttons change a little if creating vs. updating
    // ApiUtil action changes

    var user = CurrentUserStore.currentUser();
    return { username: user.username, password: null };
  },

  componentDidMount: function () {
    this.onChangeToken = CurrentUserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove()
  },

  render: function () {
    return (
      <div className="modal" onClick={this._cancel}>
        <div className="modal-container" onClick={this._stopPropogation}>
          <h2>Edit your Profile</h2>

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

          <button onClick={this._cancel}>Cancel</button>
          <button onClick={this._submit}>Save Changes</button>
        </div>
      </div>
    );
  },

  _cancel: function () {
    ModalActions.destroyModal();
  },

  _submit: function () {
    var params = this.state;
    if (!params.password) {
      delete params.password;
    }

    ApiUtil.updateUser(CurrentUserStore.currentUser().id, params);
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  },

  _onChange: function () {
    var user = CurrentUserStore.currentUser();
    this.setState({ username: user.username, password: null });
  }
});
