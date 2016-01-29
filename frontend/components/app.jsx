var React = require('react'),
    AudioActions = require('./../actions/audio_actions'),
    AudioStore = require('./../stores/audio'),
    Navbar = require('./navbar');

module.exports = React.createClass({
  componentWillMount: function () {
    var audio = new Audio();
    AudioActions.mount(audio);
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
