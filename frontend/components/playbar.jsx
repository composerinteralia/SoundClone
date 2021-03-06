var React = require('react'),
    Link = require('react-router').Link,
    PlayerStore = require('../stores/player'),
    PlayerActions = require('../actions/player_actions'),
    PlayerControls = require('../mixins/player_controls'),
    TrackStore = require('../stores/track'),
    LikeMixin = require('../mixins/like_mixin'),
    CurrentUserStore = require('../stores/current_user');

var formatSecondsAsTime = function (secs) {
  secs = Math.round(secs);
	var min = Math.floor(secs / 60 );
	var sec = secs - (min * 60);

	if (sec < 10)  { sec  = "0" + sec; }

  return min + ':' + sec;
};

module.exports = React.createClass({
  mixins: [PlayerControls, LikeMixin],

  getInitialState: function () {
    return {
      track: PlayerStore.track(),
      time: PlayerStore.currentTime()
    };
  },

  componentDidMount: function () {
    this.onChangeToken = TrackStore.addListener(this._onChange);
    this.playerChangeToken = PlayerStore.addListener(this._onChange);

    document.addEventListener('keypress', this._onKeypress);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
    this.playerChangeToken.remove();

    document.removeEventListener('keypress', this._onKeypress);
  },

  render: function () {
    var track = this.state.track;

    if (!track) {
      return <div></div>;
    }

    var totalTime = PlayerStore.totalTime();
    var position = (350 / totalTime) * this.state.time;

    return (
      <footer className="playbar">
        <div className="playbar-body group">

          <div className="controls">
            <i className="fa fa-step-backward playback-button"
              onClick={ this._playPrev }></i>

            { this._playPauseButton() }

            <i className="fa fa-step-forward playback-button"
              onClick={ this._playNext }></i>
          </div>

          <div className="progress">
            <span className="elapsed">
              { formatSecondsAsTime(this.state.time) }
            </span>

            <div className="progress-timeline">
              <div
                className="progress-bar"
                style={ { 'width': position + 'px' } }>
              </div>
            </div>

            <span>{ formatSecondsAsTime(totalTime) }</span>
          </div>

          { this._likeButton() }

          { this._trackInfo() }

        </div>
      </footer>
    );
  },

  _likeButton: function () {
    if (CurrentUserStore.isLoggedIn()) {
      if (this.state.liked) {
        return (
          <button
            title="Unlike track"
            className="unlike playbar-like"
            onClick={this._onUnlike}>
            <span className="heart">♥</span>
          </button>
        );

      } else {
        return (
          <button
            title="Like track"
            className="like playbar-like"
            onClick={this._onLike}>
            <span className="heart">♥</span>
          </button>
        );
      }
    }
  },

  _trackInfo: function () {
    var track = this.state.track;

    if (CurrentUserStore.isLoggedIn()) {
      return (
        <Link
          to={ "/tracks/" + track.id }
          className="track-info group">

          <figure className="playbar-art">
            <img src={ track.image_url }/>
          </figure>

          <p className="playbar-title">{ track.title }</p>

        </Link>
      );
    } else {
      return (
        <div className="track-info group">

          <figure className="playbar-art">
            <img src={ track.image_url }/>
          </figure>

          <p className="playbar-title">{ track.title }</p>

        </div>
      );
    }
  },

  _onUnlike: function () {
    this.setState({ liked: false });
    this._unlikeTrack(this.state.track.id);
  },

  _onLike: function () {
    this.setState({ liked: true });
    this._likeTrack(this.state.track.id);
  },

  _playPauseButton: function () {
    if (PlayerStore.isPlaying()) {
      return (<i className="fa fa-pause playback-button"
        onClick={this._pauseTrack}></i>
      );
    } else {
      return (<i className="fa fa-play playback-button"
        onClick={this._playTrack.bind(null, this.state.track)}></i>
      );
    }
  },

  _onChange: function () {
    // this all stinks

    var playingTrack = PlayerStore.track();
    var track;

    if (playingTrack) {
      track = TrackStore.find(playingTrack.id);
    } else {
      this.setState({ track: null })
    }

    if (track) {
      var liked = track.liker_ids.includes(CurrentUserStore.currentUser().id);
      this.setState({ track: track, liked: liked, time: PlayerStore.currentTime() });
    } else {
      this.setState({ time: PlayerStore.currentTime() });
    }

  },

  _onKeypress: function  (e) {
    if (e.keyCode === 32) {
      if (e.target.localName !== "input" &&
          e.target.localName !== "textarea") {

        e.preventDefault();
        PlayerActions.playPause();
      }
    }
  }
});
