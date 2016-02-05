var React = require('react'),
    Link = require('react-router').Link,
    PlayerStore = require('../stores/player'),
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
    this.playerChangeToken = PlayerStore.addListener(this._onPlayerChange);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
    this.playerChangeToken.remove();

    clearInterval(this.counter);
  },

  render: function () {
    var track = this.state.track;

    if (!track) {
      return <div></div>;
    }

    var totalTime = PlayerStore.totalTime();
    var position = (350 / totalTime) * this.state.time;


    var likeButton;
    if (CurrentUserStore.isLoggedIn()) {
      if (this.state.liked) {
        likeButton =
        <button
          title="Unlike track"
          className="unlike playbar-like"
          onClick={this._onUnlike}>
          <span className="heart">♥</span>
        </button>;

      } else {
        likeButton =
        <button
          title="Like track"
          className="like playbar-like"
          onClick={this._onLike}>
          <span className="heart">♥</span>
        </button>;
      }
    }

    return (
      <footer className="playbar">
        <div className="playbar-body group">

          <div className="controls">
            <i className="fa fa-step-backward playback-button"
              onClick={this._playPrev.bind(null, track)}></i>

            {this._playPauseButton()}

            <i className="fa fa-step-forward playback-button"
              onClick={this._playNext.bind(null, track)}></i>
          </div>

          <div className="progress">
            <span className="elapsed">
              {formatSecondsAsTime(this.state.time)}
            </span>

            <div className="progress-timeline">
              <div
                className="progress-bar"
                style={{'width': position + 'px' }}>
              </div>
            </div>

            <span>{formatSecondsAsTime(totalTime)}</span>
          </div>

          {likeButton}
          <Link
            to={"/tracks/" + track.id}
            className="track-info group">

            <figure className="playbar-art">
              <img src={track.image_url}/>
            </figure>

            <p className="playbar-title">{track.title}</p>

          </Link>

        </div>
      </footer>
    );
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

  _onPlayerChange: function () {

    if (PlayerStore.isPlaying()) {
      clearInterval(this.counter);
      this.counter = setInterval(function () {
        this.setState({ time: PlayerStore.currentTime() });
      }.bind(this), 60);
    } else {
      clearInterval(this.counter);
    }

    this._onChange();
  },

  _onChange: function () {
    var playingTrack = PlayerStore.track();
    var track;

    if (playingTrack) {
      track = TrackStore.find(playingTrack.id);
    }

    if (track) {
      var liked = track.liker_ids.includes(CurrentUserStore.currentUser().id);
      this.setState({ track: track, liked: liked });
    } else {
      this.setState({});
    }

  }
});
