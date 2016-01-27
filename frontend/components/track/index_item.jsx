var React = require('react'),
    ModalActions = require('../../actions/modal_actions'),
    UpdateTrack = require('./update');

module.exports = React.createClass({
  render: function () {
    var track = this.props.track;
    return (
      <li className="user-track">
        {track.title}
        <button onClick={this._updateTrack}>Edit</button>
        <button onClick={this._deleteTrack}>Delete</button>
      </li>
    );
  },

  _updateTrack: function (e) {
    e.preventDefault();
    var modal = <UpdateTrack trackId={this.props.track.id} />;
    ModalActions.receiveModal(modal);
  },

  _deleteTrack: function () {

  }

});
