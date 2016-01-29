var React = require('react'),
    LinkState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions');

module.exports = React.createClass({
  mixins: [LinkState],

  getInitialState: function () {
    var user = this.props.user;
    return { username: user.username, password: null };
  },

  render: function () {
    return (
      <div className="modal" onClick={this._onCancel}>
        <div className="modal-container" onClick={this._stopPropogation}>
          <h2>Edit your Profile</h2>

          <form onSubmit={this._onSubmit} className="user-update-form">
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

          <button onClick={this._onCancel}>Cancel</button>
          <button onClick={this._onSubmit}>Save Changes</button>
        </div>
      </div>
    );
  },

  _onCancel: function () {
    ModalActions.destroyModal();
  },

  _onSubmit: function () {
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
