var React = require('react'),
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions'),
    UpdateTrack = require('./update');

module.exports = React.createClass({
  // delete buttons should close on any click outside the dialog box
  getInitialState: function () {
    return ({ deleting: false });
  },

  render: function () {
    var track = this.props.track;

    var deleteClass = "popup";
    if (this.state.deleting) {
      deleteClass = "popup active";
    }

    return (
      <li className="user-track">
        {track.title}
        <button onClick={this._update}>Edit</button>
        <button onClick={this._delete}>Delete</button>
        <div className={deleteClass}>
          Are you sure you want to permanently delete this track?
          <button onClick={this._cancelDelete}>Cancel</button>
          <button onClick={this._reallyDelete}>Delete</button>
          <div className="popup-arrow"></div>
        </div>
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
