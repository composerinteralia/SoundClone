var React = require('react'),
    Link = require('react-router').Link,
    History = require('react-router').History,
    SessionsApiUtil = require('../util/sessions_api_util');

module.exports = React.createClass({
  mixins: [History],

  render: function () {
    return (
      <header className="nav">
        <nav className="navbar group">
          <div className="logo">
            <div className="sheep"></div>
            <div className="sheep clone"></div>
          </div>

          <a href="#" className="logout" onClick={this._logout}>Sign Out</a>
        </nav>
      </header>
    );
  },

  _logout: function (e) {
    e.preventDefault();
    SessionsApiUtil.logout(function () {
      this.history.pushState({}, "/login");
    }.bind(this));
  }

});
