var React = require('react'),
    TrackIndexItem = require('./index_item'),
    TrackStore = require('../../stores/track'),
    ApiUtil = require('../../util/api_util');

module.exports = React.createClass({
  getInitialState: function () {
    return ({ tracks: []});
  },

  componentDidMount: function () {
    this.onChangeToken = TrackStore.addListener(this._onChange);
    ApiUtil.fetchUserTracks(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
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
