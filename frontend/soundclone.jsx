var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    Navbar = require('./components/navbar'),
    Explore = require('./components/track/explore'),
    Profile = require('./components/user/profile'),
    TracksIndex = require('./components/track/index'),
    AudioActions = require('./actions/audio_actions'),
    AudioStore = require('./stores/audio');

var App = React.createClass({
  componentWillMount: function () {
    var audio = new Audio()
    AudioActions.mount(audio)
  },

  render: function () {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
});

var router = (
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Explore}/>
      <Route path="users/:id" component={Profile}>
        <IndexRoute component={TracksIndex}/>
      </Route>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  if (root) {
    ReactDOM.render(router, root);
  }
});
