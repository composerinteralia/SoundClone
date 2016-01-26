var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render: function () {
    return (
      <div>It works</div>
    );
  }
});

var router = (
  <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(router, document.getElementById('root'));
});
