var React = require('react'),
    Link = require('react-router').Link,
    LikeMixin = require('../../mixins/like_mixin'),
    PlayerStore = require('../../stores/player'),
    CurrentUserStore = require('../../stores/current_user'),
    WaveSurfer = require('./wavesurfer'),
    PlayPauseButton = require('./play_pause_button');

module.exports = React.createClass({
  mixins: [LikeMixin],

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

    return (
      <li className="explore-item">

        <figure className="explore-image">
          <img src={track.image_url}/>
          <PlayPauseButton playing={this.state.playing} track={track}/>
          {this._likeButton()}
        </figure>

        { this._exploreInfo() }

        <WaveSurfer track={track} type="hidden-wave" />
      </li>
    );
  },

  _exploreInfo: function () {
    var track = this.props.track;

    if (CurrentUserStore.isLoggedIn()) {
      return(
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
      );
    } else {
      return(
        <section className="explore-info">
          <p className="track-name">
            {track.title}
          </p>

          <p className="track-user">
            {track.display_name}
          </p>
        </section>
      );
    }
  },

  _likeButton: function () {
    var track = this.props.track;

    if (CurrentUserStore.isLoggedIn()) {
      if (track.liker_ids.includes(CurrentUserStore.currentUser().id)) {
        return (
          <button
            title="Unlike track"
            className="small-unlike small-like-btn"
            onClick={this._unlikeTrack.bind(this, track.id)}>
            <span className="heart">♥</span>
          </button>
        );

      } else {
        return (
          <button
            title="Like track"
            className="small-like small-like-btn"
            onClick={this._likeTrack.bind(this, track.id)}>
            <span className="heart">♥</span>
          </button>
        );
      }
    }
  },

  _onPlayerChange: function () {
    this.setState({ playing: PlayerStore.isCurrentTrack(this.props.track.id) });
  }
});
