var React = require('react'),
    Link = require('react-router').Link,
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions'),
    DialogActions = require('../../actions/dialog_actions'),
    UpdateTrack = require('./update'),
    AudioActions = require('../../actions/audio_actions'),
    CurrentUserStore = require('../../stores/current_user'),
    DialogStore = require('../../stores/dialog');

module.exports = React.createClass({
  getInitialState: function () {
    return ({ dialog: null });
  },

  componentDidMount: function () {
    this.onDialogToken = DialogStore.addListener(this._onDialog);
  },

  componentWillUnmount: function () {
    this.onDialogToken.remove();
  },

  render: function () {
    var buttons, track = this.props.track;

    if (CurrentUserStore.currentUser().id === track.user_id) {
        buttons = this._trackButtons();
    }

    return (
      <li className="track group">
        <figure className="track-image">
          <img src={track.image_url}/>
        </figure>

        <section className="track-detail-container">

          <div className="group">
            <div className="play-button" onClick={this._playTrack}>
              <div className="play-arrow"></div>
            </div>

            <div className="track-naming">
              <Link
                className="track-username"
                to={"/users/" + track.user_id}>{track.username}
              </Link>
              <p>{track.title}</p>
            </div>
          </div>

          {buttons}

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
    AudioActions.play(this.props.track.audio_url);
  },

  _update: function () {
    var modal = <UpdateTrack trackId={this.props.track.id} />;
    ModalActions.receiveModal(modal);
  },

  _delete: function () {
    var dialog =
      <div className="popup">
        <p>Are you sure you want to permanently delete this track?</p>
        <button className="cancel" onClick={this._cancelDelete}>Cancel</button>
        <button onClick={this._reallyDelete}>Delete</button>
        <div className="popup-arrow"></div>
      </div>

    var trackId = this.props.track.id;

    DialogActions.receiveDialog(trackId, dialog)
  },

  _cancelDelete: function () {
    DialogActions.clearDialog();
  },

  _reallyDelete: function () {
    ApiUtil.destroyTrack(this.props.track.id);
  },

  _onDialog: function () {
    var dialog = DialogStore.find(this.props.track.id);
    this.setState({ dialog: dialog })
  }

});
