var React = require('react'),
    PlayerActions = require('../actions/player_actions'),
    PlayerStore = require('../stores/player'),
    // AudioStore = require('../stores/audio'),
    TrackStore = require('../stores/track');
    // AudioActions = require('../actions/audio_actions');

module.exports = React.createClass({
  getInitialState: function () {
    var track = TrackStore.find(PlayerStore.trackId());
    return { track: track };
  },

  componentDidMount: function () {
    this.playerChangeToken = PlayerStore.addListener(this._onPlayerChange);
  },

  componentWillUnmount: function () {
    this.playerChangeToken.remove();
  },

  render: function () {
    if (!this.state.track) {
      return <div></div>;
    }

    return (
      <section className="player">
        <div className="player-body">
          <div className="controls">
            <button onClick={this._playPrev}>PREVIOUS</button>
            <div className="play-pause">{this._playPauseButton()}</div>
            <button onClick={this._playNext}>NEXT</button>
          </div>

          <div className="track-info">
            {this.state.track.title}
          </div>
        </div>
      </section>
    );
  },

  _playPauseButton: function () {
    if (PlayerStore.isPlaying()) {
      return (
        <div className="play-button" onClick={this._pauseTrack}>
          <div className="pause-line left"></div>
          <div className="pause-line"></div>
        </div>
      );

    } else {
      return (
        <div className="play-button" onClick={this._playTrack}>
          <div className="play-arrow"></div>
        </div>
      );
    }
  },

  _onPlayerChange: function () {
    var track = TrackStore.find(PlayerStore.trackId());
    this.setState({ track: track });
  },

  _playTrack: function () {
    PlayerActions.play(this.state.track.id);
  },

  _pauseTrack: function () {
    PlayerActions.pause();
  },

  _playNext: function () {
    var nextTrack = TrackStore.next(this.state.track);

    if (nextTrack) {
      PlayerActions.play(nextTrack.id);
    }
  },

  _playPrev: function () {
    var prevTrack = TrackStore.prev(this.state.track);

    if (prevTrack) {
      PlayerActions.play(prevTrack.id);
    }
  }
});
