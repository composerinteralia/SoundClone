var React = require('react'),
    LinkedState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions'),
    TrackStore = require('../../stores/track');

module.exports = React.createClass({
  mixins: [LinkedState],

  getInitialState: function () {
    var title = "", description = "";
    var track = TrackStore.find(this.props.trackId);

    if (track) {
      title = track.title;
      description = track.description;
    }

    return { title: title, description: description };
  },

  componentDidMount: function () {
    this.onChangeToken = TrackStore.addListener(this._onChange);
    ApiUtil.fetchSingleTrack(this.props.trackId);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
  },

  render: function () {
    return (
      <div className="modal" onClick={this._onCancel}>
        <div className="modal-container" onClick={this._stopPropogation}>
          <h2>Edit Track</h2>

            <form className="track-update-form">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                valueLink={this.linkState('title')}>
              </input>

              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                valueLink={this.linkState('description')}>
              </textarea>
            </form>

          <button onClick={this._onCancel}>Cancel</button>
          <button onClick={this._onSubmit}>Save Changes</button>
        </div>
      </div>
    );
  },

  _onChange: function () {
    var title = "", description = "";
    var track = TrackStore.find(this.props.trackId);

    if (track) {
      title = track.title;
      description = track.description;
    }

    this.setState({ title: title, description: description });
  },

  _onSubmit: function (e) {
    ApiUtil.updateTrack (this.props.trackId, this.state);
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  },

  _onCancel: function (e) {
    ModalActions.destroyModal();
  }
});
