var React = require('react'),
    TrackIndexItem = require('./index_item');

module.exports = React.createClass({
  render: function () {
    var tracks = this.props.user.tracks;
    return (
      <div className="user-tracks">
        <h2>Tracks</h2>
        <ul className="user-tracks-list">
          {
            tracks.map(function (track) {
              return (
                <TrackIndexItem key={track.id} track={track} />
              );
            })
          }
        </ul>
      </div>
    );
  }
});
