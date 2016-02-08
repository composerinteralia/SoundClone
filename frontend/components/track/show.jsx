var React = require('react'),
    Link = require('react-router').Link,
    LikeMixin = require('../../mixins/like_mixin'),
    TrackStore = require('../../stores/track'),
    PlayerStore = require('../../stores/player'),
    PlayerActions = require('../../actions/player_actions'),
    CurrentUserStore = require('../../stores/current_user'),
    TrackUtil = require('../../util/track_util'),
    WaveSurfer = require('./wavesurfer'),
    PlayPauseButton = require('./play_pause_button')

module.exports = React.createClass({
  mixins: [LikeMixin],

  getInitialState: function () {
    return {
      track: null,
      playing: PlayerStore.isCurrentTrack(this.props.params.id)
    };
  },

  componentDidMount: function () {
    this.onChangeToken = TrackStore.addListener(this._onChange);
    this.playerChangeToken = PlayerStore.addListener(this._onPlayerChange);

    TrackUtil.fetchSingleTrack(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
    this.playerChangeToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    TrackUtil.fetchSingleTrack(newProps.params.id);
  },

  render: function () {
    var track = this.state.track;

    if (!track) {
      return <div>User not found!</div>;
    }

    return (
      <main className="main">
        <header className="track-header group">

          <div className="track-header-left">
              <PlayPauseButton playing={this.state.playing} track={track}/>

              <div className="track-names header-names">
                <Link
                  className="track-user-name header-name"
                  to={"/users/" + track.user_id}>
                  {track.display_name}
                </Link>

                <div className="track-name group">
                  <h1 className="header-name">{track.title}</h1>
                </div>
              </div>

              <WaveSurfer track={track} type="show-wave" />
          </div>

          <figure className="track-header-image">
            <img src={track.image_url}/>
          </figure>

        </header>

        <section className="content">
          {this._likeButton()}
          <p>{track.description}</p>
        </section>

      </main>
    );
  },

  _likeButton: function () {
    var track = this.state.track;
    var currentUser = CurrentUserStore.currentUser();

    if (currentUser && currentUser.id !== track.user_id) {
      if (track.liker_ids.includes(currentUser.id)) {
        return (
          <button
            className="unlike"
            onClick={this._unlikeTrack.bind(this, track.id)}>
            <span className="heart">♥</span> Liked
          </button>
        )

      } else {
        return (
          <button
            className="like"
            onClick={this._likeTrack.bind(this, track.id)}>
            <span className="heart">♥</span> Like
          </button>
        )
      }
    }
  },

  _onChange: function () {
    var track = TrackStore.find(this.props.params.id);
    this.setState({ track: track });
  },

  _onPlayerChange: function () {
    this.setState({ playing: PlayerStore.isCurrentTrack(this.props.params.id) });
  }
});
