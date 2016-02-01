var React = require('react'),
    AudioActions = require('./../actions/audio_actions'),
    AudioStore = require('./../stores/audio'),
    Navbar = require('./navbar'),
    Player = require('./player');

module.exports = React.createClass({
  componentWillMount: function () {
    this.audio = new Audio();
    AudioActions.mount(this.audio);
  },

  componentWillUnmount: function () {
    this.audio.pause();
  },

  render: function () {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Player />
      </div>
    );
  }
});
