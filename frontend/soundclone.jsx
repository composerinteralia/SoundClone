var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,

    CurrentUserStore = require('./stores/current_user'),
    SessionsApiUtil = require('./util/sessions_api_util'),

    App = require('./components/app'),
    Stream = require('./components/track/stream'),
    Explore = require('./components/track/explore'),
    Upload = require('./components/track/upload'),
    Profile = require('./components/user/profile'),
    ProfileTracksIndex = require('./components/track/profile_index'),
    Track = require('./components/track/show'),
    Login = require('./components/login/login');


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
  if (CurrentUserStore.beenFetched()) {
    _redirectIfLoggedIn();
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfLoggedIn);
  }

  function _redirectIfLoggedIn () {
    if (CurrentUserStore.isLoggedIn()) {
      replace({}, "/");
    }
    callback();
  }
};

var router = (
  <Router onUpdate={ function () { window.scrollTo(0, 0) } }>
    <Route path="/" component={ App } onEnter={_ensureLoggedIn} >
      <IndexRoute component={ Stream } />
      <Route path="explore" component={ Explore } />
      <Route path="upload" component={ Upload } />
      <Route path="users/:id" component={ Profile } >
        <IndexRoute component={ ProfileTracksIndex } />
      </Route>
      <Route path="tracks/:id" component={ Track } />
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
