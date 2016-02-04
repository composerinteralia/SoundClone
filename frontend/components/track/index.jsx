var React = require('react'),
    TrackIndexItem = require('./index_item'),
    TrackStore = require('../../stores/track'),
    TrackUtil = require('../../util/track_util');

module.exports = React.createClass({
  getInitialState: function () {
    return ({ tracks: []});
  },

  componentDidMount: function () {
    this.onChangeToken = TrackStore.addListener(this._onChange);
    TrackUtil.fetchUserTracks(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    TrackUtil.fetchUserTracks(newProps.params.id);
  },

  render: function () {
    var tracks = this.state.tracks;
    return (
      <ul className="tracks-list">
        {
          tracks.map(function (track) {
            return (
              <TrackIndexItem key={track.id} track={track} />
            );
          })
        }
      </ul>
    );
  },

  _onChange: function () {
    this.setState({ tracks: TrackStore.all()});
  }
});
