var React = require('react'),
    PlayerStore = require('../../stores/player'),
    PlayerControls = require('../../mixins/player_controls');

module.exports = React.createClass({
  mixins: [PlayerControls],

  render: function () {
    if (this.props.playing && PlayerStore.isPlaying()) {
      return (
        <div className="play-button" onClick={this._pauseTrack}>
          <div className="pause-line left"></div>
          <div className="pause-line"></div>
        </div>
      )
    } else {
      return (
        <div className="play-button" onClick={this._playTrack.bind(null, this.props.track)}>
          <div className="play-arrow"></div>
        </div>
      )
    }
  }
});
