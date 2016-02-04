var React = require('react'),
    Link = require('react-router').Link,
    PlayerActions = require('../../actions/player_actions'),
    PlayerStore = require('../../stores/player'),
    CurrentUserStore = require('../../stores/current_user');

module.exports = React.createClass({
  getInitialState: function () {
    var playing =
      (PlayerStore.track() &&
      (PlayerStore.track().id === this.props.track.id)
    );

    return ({ playing: playing });
  },

  componentDidMount: function () {
    this.playerChangeToken = PlayerStore.addListener(this._onPlayerChange);

    this._initWavesurfer();
  },

  componentWillUnmount: function () {
    this.playerChangeToken.remove();

    setTimeout(function () {
      PlayerActions.removeWavesurfer(this.props.track.id);
    }.bind(this), 0);
  },

  render: function () {

    var playPauseButton, name, track = this.props.track;

    if (this.state.playing && PlayerStore.isPlaying()) {
      playPauseButton = (
        <div className="play-button play-button-explore" onClick={this._pauseTrack}>
          <div className="pause-line left"></div>
          <div className="pause-line"></div>
        </div>
      );
    } else {
      playPauseButton = (
        <div className="play-button play-button-explore" onClick={this._playTrack}>
          <div className="play-arrow"></div>
        </div>
      );
    }

    return (
      <li className="explore-item">
        <figure className="explore-image">
          <img src={track.image_url}/>
          {playPauseButton}
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

        <div className={ "hidden-wave wave-" + this.props.track.id }></div>
      </li>
    );
  },

  _playTrack: function () {
    PlayerActions.play(this.props.track.id);
  },

  _pauseTrack: function () {
    PlayerActions.pause();
  },

  _onPlayerChange: function () {
    var playing =
      (PlayerStore.track() &&
      (PlayerStore.track().id === this.props.track.id)
    );

    this.setState({ playing: playing });
  },

  _initWavesurfer: function () {

    var containerClass = "wave-" + this.props.track.id
    var container = $("." + containerClass)[0];

    if (PlayerStore.wavesurferExists(containerClass)) {
      setTimeout(function () {
        PlayerActions.remountWavesurfer(container, "hidden-wave")
      }.bind(this), 0);
      return
    }

    var wavesurfer = Object.create(WaveSurfer);

    wavesurfer.init({
      container: container,
      waveColor: '#888',
      progressColor: '#f50',
      barWidth: 2,
      cursorWidth: 0,
    });

    wavesurfer.load(this.props.track.audio_url);

    setTimeout(function () {
      PlayerActions.receiveWavesurfer({
        track: this.props.track,
        wavesurfer: wavesurfer
      });
    }.bind(this), 0);

  }

});
