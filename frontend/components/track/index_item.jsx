var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions'),
    UpdateTrack = require('./update');

module.exports = React.createClass({
  // delete buttons should close on any click outside the dialog box - dialog store
  getInitialState: function () {
    return ({ deleting: false });
  },

  render: function () {
    var track = this.props.track;

    var deleteClass = "popup";
    if (this.state.deleting) {
      deleteClass = "popup active";
    }

// click play button makes new audio element
// triggers action
// play store (only holds on at a time, remove old one from DOM)
// rerenders as pause button
// pause button triggers action
// play store
// rerenders as play button

    return (
      <li className="track group">
        <figure className="track-image">
          <img src={track.image_url}/>
        </figure>

        <section className="track-detail-container">
          <div className="group">
            <div className="play-button">
              <div className="play-arrow"></div>
            </div>
            <div className="track-naming">
              <p>Username goes here</p>
              <p>{track.title}</p>
            </div>
          </div>

          <div className="track-buttons">
            <button onClick={this._update}>Edit</button>
            <button onClick={this._delete}>Delete</button>
            <div className={deleteClass}>
              <p>Are you sure you want to permanently delete this track?</p>
              <button onClick={this._cancelDelete}>Cancel</button>
              <button onClick={this._reallyDelete}>Delete</button>
              <div className="popup-arrow"></div>
            </div>
          </div>
        </section>
      </li>
    );
  },

  _update: function (e) {
    var modal = <UpdateTrack trackId={this.props.track.id} />;
    ModalActions.receiveModal(modal);
  },

  _delete: function (e) {
    this.setState({ deleting: true });
  },

  _cancelDelete: function (e) {
    this.setState({ deleting: false });
  },

  _reallyDelete: function (e) {
    ApiUtil.destroyTrack(this.props.track.id);
  }

});
