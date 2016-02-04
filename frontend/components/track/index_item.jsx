var React = require('react'),
    Link = require('react-router').Link,
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions'),
    DialogActions = require('../../actions/dialog_actions'),
    UpdateTrackForm = require('./update_form'),
    PlayerActions = require('../../actions/player_actions'),
    PlayerStore = require('../../stores/player'),
    CurrentUserStore = require('../../stores/current_user'),
    DialogStore = require('../../stores/dialog'),
    WaveSurfer = require('./wavesurfer');

module.exports = React.createClass({
  getInitialState: function () {
    var playing =
      (PlayerStore.track() &&
      (PlayerStore.track().id === this.props.track.id)
    );

    return ({ dialog: null, playing: playing });
  },

  componentDidMount: function () {
    this.currentUserChangeToken =
      CurrentUserStore.addListener(this._onCurrentUserChange);
    this.dialogToken = DialogStore.addListener(this._onDialog);
    this.playerChangeToken = PlayerStore.addListener(this._onPlayerChange);
  },

  componentWillUnmount: function () {
    this.currentUserChangeToken.remove();
    this.dialogToken.remove();
    this.playerChangeToken.remove();
  },

  render: function () {
    var playPauseButton,
        trackButtons,
        track = this.props.track,
        display_name = track.display_name,
        currentUser = CurrentUserStore.currentUser();

    if (currentUser && currentUser.id === track.user_id) {
      trackButtons = this._trackButtons();
      display_name = currentUser.display_name;
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
        <Link to={"/tracks/" + track.id} className="track-image">
          <img src={track.image_url}/>
        </Link>

        <section className="track-detail-container">

          <div className="group">
            {playPauseButton}

            <div className="track-naming">

              <Link
                className="track-user"
                to={"/users/" + track.user_id}>{display_name}
              </Link>

              <Link
                className="track-name"
                to={"/tracks/" + track.id}>
                {track.title}
              </Link>

              <WaveSurfer track={track} type="wave" />
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

  _onCurrentUserChange: function () {
    this.forceUpdate();
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
  }
});
