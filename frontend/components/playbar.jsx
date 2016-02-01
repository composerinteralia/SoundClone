var React = require('react'),
    // AudioStore = require('../stores/audio'),
    TrackStore = require('../stores/track');
    // AudioActions = require('../actions/audio_actions');

module.exports = React.createClass({
  getInitialState: function () {
    return { track: AudioStore.track() };
  },

  componentDidMount: function () {
    this.trackChangeToken = AudioStore.addListener(this._onTrackChange);
  },

  componentWillUnmount: function () {
    this.trackChangeToken.remove();
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
    if (AudioStore.paused()) {

      return (
        <div className="play-button" onClick={this._playTrack}>
          <div className="play-arrow"></div>
        </div>
      );

    } else {

      return (
        <div className="play-button" onClick={this._pauseTrack}>
          <div className="pause-line left"></div>
          <div className="pause-line"></div>
        </div>
      );
    }
  },

  _onTrackChange: function () {
    this.setState({ track: AudioStore.track() });
  },

  _playTrack: function () {
    AudioActions.play(this.state.track);
  },

  _pauseTrack: function () {
    AudioActions.pause();
  },

  _playNext: function () {
    var nextTrack = TrackStore.next(this.state.track);

    if (nextTrack) {
      AudioActions.play(nextTrack);
    }
  },

  _playPrev: function () {
    var prevTrack = TrackStore.prev(this.state.track);

    if (prevTrack) {
      AudioActions.play(prevTrack);
    }
  }
});
