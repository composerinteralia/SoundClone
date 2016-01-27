var React = require('react'),
    LinkedState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../util/api_util');

module.exports = React.createClass({
  mixins: [LinkedState],

  getInitialState: function () {
    var user = this.props.user;
    return { username: user.username, password: null };
  },

  render: function () {
    return (
      <div className="user-update-background" onClick={this._onCancel}>
        <div className="user-update-container" onClick={this._stopPropogation}>
          <h2>Edit your Profile</h2>
          <form className="user-update-form">
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

  _onSubmit: function (e) {
    e.preventDefault();

    var params = this.state;
    if (params.password === null) {
      delete params.password;
    }

    ApiUtil.updateUser(this.props.user.id, params);
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  },

  _onCancel: function (e) {
    this.props.toggle(e);
  }
});
