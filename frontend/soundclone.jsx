var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,

    CurrentUserStore = require('./stores/current_user'),
    SessionsApiUtil = require('./util/sessions_api_util'),

    App = require('./components/app'),
    Explore = require('./components/track/explore'),
    Profile = require('./components/user/profile'),
    TracksIndex = require('./components/track/index'),
    Login = require('./components/login');


var _ensureLoggedIn = function(nextState, replace, callback) {
  if (CurrentUserStore.beenFetched()) {
    _redirectIfNotLoggedIn();
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn () {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/login");
    }
    callback();
  }
};

var _ensureLoggedOut = function (nextState, replace, callback) {
  if (CurrentUserStore.isLoggedIn()) {
    replace({}, "/");
  }
  callback();
};

var router = (
  <Router>
    <Route path="/" component={ App } onEnter={_ensureLoggedIn} >
      <IndexRoute component={ Explore } />
      <Route path="users/:id" component={ Profile } >
        <IndexRoute component={ TracksIndex } />
      </Route>
    </Route>

    <Route path="/login" component={ Login } onEnter={_ensureLoggedOut} />
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  if (root) {
    ReactDOM.render(router, root);
  }
});
