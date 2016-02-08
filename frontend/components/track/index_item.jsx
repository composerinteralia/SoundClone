var React = require('react'),
    Link = require('react-router').Link,
    LikeMixin = require('../../mixins/like_mixin'),
    TrackUtil = require('../../util/track_util'),
    DialogStore = require('../../stores/dialog'),
    DialogActions = require('../../actions/dialog_actions'),
    ModalActions = require('../../actions/modal_actions'),
    PlayerActions = require('../../actions/player_actions'),
    PlayerStore = require('../../stores/player'),
    CurrentUserStore = require('../../stores/current_user'),
    UpdateTrackForm = require('./update_form'),
    WaveSurfer = require('./wavesurfer'),
    PlayPauseButton = require('./play_pause_button');

module.exports = React.createClass({
  mixins: [LikeMixin],

  getInitialState: function () {
    return ({
      playing: PlayerStore.isCurrentTrack(this.props.track.id),
      dialog: null
    });
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
    var trackButtons;
        track = this.props.track,
        display_name = track.display_name,
        currentUser = CurrentUserStore.currentUser();

    if (currentUser && currentUser.id === track.user_id) {
      trackButtons = this._UDButtons();
      display_name = currentUser.display_name;

    } else if (currentUser) {
      trackButtons = this._likeButton();
    }

    return (
      <li className="track group">

        <Link to={"/tracks/" + track.id} className="track-image">
          <img src={track.image_url}/>
        </Link>

        <section className="track-detail-container">

          <div className="group">
            <PlayPauseButton playing={this.state.playing} track={track}/>

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
            </div>

          </div>

          <WaveSurfer track={track} type="wave" />

          {trackButtons}

        </section>
      </li>
    );
  },

  _UDButtons: function () {
    return (
      <div className="track-buttons group">
        <i title="Edit Track" className="fa fa-pencil track-button"
          onClick={this._update}></i>
        <i title="Delete Track" className="fa fa-trash track-button"
          onClick={this._delete}></i>

        {this.state.dialog}
      </div>
    );
  },

  _likeButton: function () {
    var track = this.props.track;

    if (track.liker_ids.includes(currentUser.id)) {
      return (
        <button
          className="unlike index-like"
          onClick={this._unlikeTrack.bind(this, track.id)}>
          <span className="heart">♥</span> {track.liker_ids.length}
        </button>
      );

    } else {
      return (
        <button
          className="like index-like"
          onClick={this._likeTrack.bind(this, track.id)}>
          <span className="heart">♥</span> Like
        </button>
      );
    }
  },

  _update: function () {
    var modal = <UpdateTrackForm track={this.props.track} />;
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
    TrackUtil.destroyTrack(trackId, function () {
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
    this.setState({ playing: PlayerStore.isCurrentTrack(this.props.track.id) });
  }
});
