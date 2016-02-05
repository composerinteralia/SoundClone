var React = require('react'),
    Link = require('react-router').Link,
    PlayerStore = require('../../stores/player'),
    CurrentUserStore = require('../../stores/current_user'),
    WaveSurfer = require('./wavesurfer'),
    PlayerControls = require('../../mixins/player_controls'),
    LikeMixin = require('../../mixins/like_mixin');

module.exports = React.createClass({
  mixins: [PlayerControls, LikeMixin],

  getInitialState: function () {
    return { playing: PlayerStore.isCurrentTrack(this.props.track.id) };
  },

  componentDidMount: function () {
    this.playerChangeToken = PlayerStore.addListener(this._onPlayerChange);
  },

  componentWillUnmount: function () {
    this.playerChangeToken.remove();
  },

  render: function () {
    var track = this.props.track;
    var playPauseButton, likeButton;

    if (this.state.playing && PlayerStore.isPlaying()) {
      playPauseButton = (
        <div className="play-button play-button-explore" onClick={this._pauseTrack}>
          <div className="pause-line left"></div>
          <div className="pause-line"></div>
        </div>
      );
    } else {
      playPauseButton = (
        <div className="play-button play-button-explore" onClick={this._playTrack.bind(null, track)}>
          <div className="play-arrow"></div>
        </div>
      );
    }

    if (CurrentUserStore.isLoggedIn()) {
      if (track.liker_ids.includes(CurrentUserStore.currentUser().id)) {
        likeButton =
        <button
          title="Unlike track"
          className="unlike small-like"
          onClick={this._unlikeTrack.bind(this, track.id)}>
          <span className="heart">♥</span>
        </button>;

      } else {
        likeButton =
        <button
          title="Like track"
          className="like small-like"
          onClick={this._likeTrack.bind(this, track.id)}>
          <span className="heart">♥</span>
        </button>;
      }
    }

    return (
      <li className="explore-item">
        <figure className="explore-image">
          <img src={track.image_url}/>
          {playPauseButton}
          {likeButton}
        </figure>

        <section className="explore-info">

          <Link
            className="track-name"
            to={"/tracks/" + track.id}>
            {track.title}
          </Link>

          <Link
            className="track-user"
            to={"/users/" + track.user_id}>
            {track.display_name}
          </Link>

        </section>

        <WaveSurfer track={track} type="hidden-wave" />
      </li>
    );
  },

  _onPlayerChange: function () {
    this.setState({ playing: PlayerStore.isCurrentTrack(this.props.track.id) });
  }
});
