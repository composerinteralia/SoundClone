var React = require('react'),
    Link = require('react-router').Link,
    History = require('react-router').History,
    SessionsApiUtil = require('../util/sessions_api_util'),
    CurrentUserStore = require('../stores/current_user'),
    PlayerActions = require('../actions/player_actions');

module.exports = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { user: CurrentUserStore.currentUser() };
  },

  componentDidMount: function () {
    this.onChangeToken = CurrentUserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
  },

  render: function () {
    var user = this.state.user;

    return (
      <header className="navbar">
        <nav className="group">
          <Link to="/" className="logo">
            <div className="sheep"></div>
            <div className="sheep clone"></div>
          </Link>

          <Link to="/" className="stream">Stream</Link>
          <Link to="/explore" className="explore">Explore</Link>

          <div className="navbar-right group">
            <Link to="/upload" className="nav-upload">Upload</Link>

            <Link to={"/users/" + user.id} className="current-user">
              <div className="navbar-thumb">
                <img src={user.profile_image_url}/>
              </div>
              {user.display_name}
            </Link>

            <a className="logout" href="#" onClick={this._logout}>Sign Out</a>
          </div>
        </nav>
      </header>
    );
  },

  _logout: function (e) {
    e.preventDefault();
    SessionsApiUtil.logout(function () {
      this.history.pushState({}, "/login");
    }.bind(this));

    PlayerActions.reset();
  },

  _onChange: function () {
    this.setState({ user: CurrentUserStore.currentUser() });
  }

});
