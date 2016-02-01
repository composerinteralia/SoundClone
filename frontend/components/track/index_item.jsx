var React = require('react'),
    Link = require('react-router').Link,
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions'),
    DialogActions = require('../../actions/dialog_actions'),
    UpdateTrackForm = require('./update_form'),
    AudioActions = require('../../actions/audio_actions'),
    AudioStore = require('../../stores/audio'),
    CurrentUserStore = require('../../stores/current_user'),
    DialogStore = require('../../stores/dialog');

module.exports = React.createClass({
  getInitialState: function () {
    var playing = (AudioStore.track === this.props.track);
    return ({ dialog: null, playing: playing });
  },

  componentDidMount: function () {
    this.dialogToken = DialogStore.addListener(this._onDialog);
    this.trackChangeToken = AudioStore.addListener(this._onTrackChange);
  },

  componentWillUnmount: function () {
    this.dialogToken.remove();
    this.trackChangeToken.remove();
  },

  render: function () {
    var pausePlay, trackButtons, track = this.props.track;

    if (CurrentUserStore.currentUser().id === track.user_id) {
      trackButtons = this._trackButtons();
    }

    if (this.state.playing && !AudioStore.paused()) {
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
        <button onClick={this._update}>Edit</button>
        <button onClick={this._delete}>Delete</button>

        {this.state.dialog}
      </div>
    );
  },

  _playTrack: function () {
    AudioActions.play(this.props.track);
  },

  _pauseTrack: function () {
    AudioActions.pause();
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
    ApiUtil.destroyTrack(this.props.track.id);
  },

  _onDialog: function () {
    var dialog = DialogStore.find(this.props.track.id);
    this.setState({ dialog: dialog });
  },

  _onTrackChange: function () {
    var playing = (AudioStore.track() === this.props.track);
    this.setState({ playing: playing });
  }

});
