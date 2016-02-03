var React = require('react'),
    Link = require('react-router').Link,
    TrackStore = require('../../stores/track'),
    PlayerStore = require('../../stores/player'),
    PlayerActions = require('../../actions/player_actions'),
    ApiUtil = require('../../util/api_util'),
    CurrentUserStore = require('../../stores/current_user');

module.exports = React.createClass({
  getInitialState: function () {
    var playing =
      (PlayerStore.track() &&
      (PlayerStore.track().id === parseInt(this.props.params.id))
    );

    return { track: null, playing: playing };
  },

  componentDidMount: function () {
    this.onChangeToken = TrackStore.addListener(this._onChange);
    this.playerChangeToken = PlayerStore.addListener(this._onPlayerChange);

    ApiUtil.fetchSingleTrack(this.props.params.id, function () {
      this._initWavesurfer();

      // do all sorts of checks for this
      // var w = PlayerStore.wavesurfer().wavesurfer;
      // $("." + w.container.classList[1])[0].appendChild(w.container.children[0]);
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
    this.playerChangeToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchUser(newProps.params.id);
  },

  render: function () {
    var track = this.state.track;

    if (!track) {
      return <div>User not found!</div>;
    }

    if (this.state.playing && PlayerStore.isPlaying()) {
      playPauseButton = (
        <div className="play-button" onClick={this._pauseTrack}>
          <div className="pause-line left"></div>
          <div className="pause-line"></div>
        </div>
      );
    } else {
      playPauseButton = (
        <div className="play-button" onClick={this._playTrack}>
          <div className="play-arrow"></div>
        </div>
      );
    }

    var likeButton;
    if (CurrentUserStore.liked(track.id)) {
      likeButton = <button onClick={this._unlikeTrack}>Unlike</button>;
    } else {
      likeButton = <button onClick={this._likeTrack}>Like</button>;
    }

    return (
      <main className="main">
        <header className="track-header group">

          <div className="track-header-left">
              {playPauseButton}

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
            <div className={ "show-wave wave-" + track.id }></div>
          </div>


          <figure className="track-header-image">
            <img src={track.image_url}/>
          </figure>

        </header>

        <section className="content">
          {likeButton}
          <div>{track.description}</div>

        </section>

      </main>
    );
  },

  _onChange: function () {
    var track = TrackStore.find(this.props.params.id);
    this.setState({ track: track });
  },

  _likeTrack: function () {
    ApiUtil.createLike(this.state.track.id);
  },

  _unlikeTrack: function () {
    ApiUtil.destroyLike(this.state.track.id);
  },

  _playTrack: function () {
    PlayerActions.play(this.state.track.id);
  },

  _pauseTrack: function () {
    PlayerActions.pause();
  },

  _onPlayerChange: function () {
    var playing =
      (PlayerStore.track() &&
      (PlayerStore.track().id === this.state.track.id)
    );

    this.setState({ playing: playing });
  },

  _initWavesurfer: function () {
    this.wavesurfer = Object.create(WaveSurfer);
    var container = ".wave-" + this.state.track.id;

    this.wavesurfer.init({
      container: $(container)[0],
      waveColor: '#888',
      progressColor: '#f50',
      barWidth: 2,
      cursorWidth: 0,
      height: 200,
      backend: 'MediaElement'
    });

    this.wavesurfer.load(this.state.track.audio_url);

    setTimeout(function () {
      PlayerActions.receiveWavesurfer({
        track: this.state.track,
        wavesurfer: this.wavesurfer
      });
    }.bind(this), 0);
  }

});
