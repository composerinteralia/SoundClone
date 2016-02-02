var React = require('react'),
    PlayerActions = require('../actions/player_actions'),
    PlayerStore = require('../stores/player'),
    TrackStore = require('../stores/track');

module.exports = React.createClass({
  getInitialState: function () {
    return { track: PlayerStore.track(), time: PlayerStore.currentTime };
  },

  componentDidMount: function () {
    this.playerChangeToken = PlayerStore.addListener(this._onPlayerChange);

    this.counter = setInterval(function () {
      this.setState({ time: PlayerStore.currentTime() });
    }.bind(this), 1000);
  },

  componentWillUnmount: function () {
    this.playerChangeToken.remove();
  },

  render: function () {
    if (!this.state.track) {
      return <div></div>;
    }

    return (
      <section className="playbar">
        <div className="playbar-body group">
          <div className="controls">
            <i className="fa fa-step-backward playback-button"
              onClick={this._playPrev}></i>

            {this._playPauseButton()}

            <i className="fa fa-step-forward playback-button"
              onClick={this._playNext}></i>
          </div>

          <div>
            {this.state.time}

          </div>

          <div className="track-info group">
            <figure className="playbar-art">
              <img src={this.state.track.image_url}/>
            </figure>
            <p className="playbar-title">{this.state.track.title}</p>
          </div>
        </div>
      </section>
    );
  },

  _playPauseButton: function () {
    if (PlayerStore.isPlaying()) {
      return (<i className="fa fa-pause playback-button"
        onClick={this._pauseTrack}></i>
      );
    } else {
      return (<i className="fa fa-play playback-button"
        onClick={this._playTrack}></i>
      );
    }
  },

  _onPlayerChange: function () {
    this.setState({ track: PlayerStore.track() });
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
