var React = require('react'),
    Link = require('react-router').Link,
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions'),
    DialogActions = require('../../actions/dialog_actions'),
    UpdateTrackForm = require('./update_form'),
    PlayerActions = require('../../actions/player_actions'),
    PlayerStore = require('../../stores/player'),
    CurrentUserStore = require('../../stores/current_user'),
    DialogStore = require('../../stores/dialog');

module.exports = React.createClass({
  getInitialState: function () {
    var playing =
      (PlayerStore.track() &&
      (PlayerStore.track().id === this.props.track.id)
    );

    return ({ dialog: null, playing: playing });
  },

  componentDidMount: function () {
    this.dialogToken = DialogStore.addListener(this._onDialog);
    this.playerChangeToken = PlayerStore.addListener(this._onPlayerChange);

    this._initWavesurfer();
  },

  componentWillUnmount: function () {
    this.dialogToken.remove();
    this.playerChangeToken.remove();

    setTimeout(function () {
      PlayerActions.removeWavesurfer(this.props.track.id);
    }.bind(this), 0);
  },

  render: function () {
    var playPauseButton, trackButtons, track = this.props.track;

    if (CurrentUserStore.currentUser().id === track.user_id) {
      trackButtons = this._trackButtons();
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

    return (
      <li className="track group">
        <figure className="track-image">
          <img src={track.image_url}/>
        </figure>

        <section className="track-detail-container">

          <div className="group">
            {playPauseButton}

            <div className="track-naming">
              <Link
                className="track-username"
                to={"/users/" + track.user_id}>{track.username}
              </Link>
              <p>{track.title}</p>
              <div className={ "wave wave-" + this.props.track.id }></div>
            </div>
          </div>

          {trackButtons}

        </section>
      </li>
    );
  },

  _trackButtons: function () {
    return (
      <div className="track-buttons">
        <i className="fa fa-pencil track-button"
          onClick={this._update}></i>
        <i className="fa fa-trash track-button"
          onClick={this._delete}></i>

        {this.state.dialog}
      </div>
    );
  },

  _playTrack: function () {
    PlayerActions.play(this.props.track.id);
  },

  _pauseTrack: function () {
    PlayerActions.pause();
  },

  _update: function () {
    var modal = <UpdateTrackForm trackId={this.props.track.id} />;
    ModalActions.receiveModal(modal);
  },

  _delete: function () {
    var dialog = (
      <div className="popup">
        <p>Are you sure you want to permanently delete this track?</p>
        <button className="cancel" onClick={this._cancelDelete}>Cancel</button>
        <button onClick={this._reallyDelete}>Delete</button>
        <div className="popup-arrow"></div>
      </div>
    );

    var trackId = this.props.track.id;

    DialogActions.receiveDialog(trackId, dialog);
  },

  _cancelDelete: function () {
    DialogActions.clearDialog();
  },

  _reallyDelete: function () {
    var trackId = this.props.track.id;
    ApiUtil.destroyTrack(trackId, function () {
      PlayerActions.destroy(trackId);
    });
  },

  _onDialog: function () {
    var dialog = DialogStore.find(this.props.track.id);
    this.setState({ dialog: dialog });
  },

  _onPlayerChange: function () {
    var playing =
      (PlayerStore.track() &&
      (PlayerStore.track().id === this.props.track.id)
    );

    this.setState({ playing: playing });
  },

  _initWavesurfer: function () {
    this.wavesurfer = Object.create(WaveSurfer);
    var container = ".wave-" + this.props.track.id;

    this.wavesurfer.init({
      container: $(container)[0],
      waveColor: '#888',
      progressColor: '#f50',
      barWidth: 2,
      cursorWidth: 0,
      backend: 'MediaElement'
    });

    this.wavesurfer.load(this.props.track.audio_url);

    setTimeout(function () {
      PlayerActions.receiveWavesurfer({
        track: this.props.track,
        wavesurfer: this.wavesurfer
      });
    }.bind(this), 0);

  }

});
