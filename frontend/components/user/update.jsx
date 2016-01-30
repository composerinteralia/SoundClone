var React = require('react'),
    LinkState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions');

module.exports = React.createClass({
  mixins: [LinkState],

  getInitialState: function () {
    // get user from current user!
    // Buttons change a little if creating vs. updating
    // ApiUtil action changes

    var user = this.props.user;
    return { username: user.username, password: null };
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

    ApiUtil.updateUser(this.props.user.id, params);
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  }
});
