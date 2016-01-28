var React = require('react'),
    ApiUtil = require('../util/api_util');

module.exports = React.createClass({
  render: function () {
    return (
      <header className="nav">
        <nav className="navbar group">
          <div className="logo">
            <div className="sheep-logo"></div>
          </div>
          <a href="#" className="logout" onClick={this._logout}>Sign Out</a>
        </nav>
      </header>
    );
  },

  _logout: function (e) {
    e.preventDefault();

    ApiUtil.logout();
  }

});
