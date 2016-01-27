var React = require('react');

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
                <li key={track.id} className="user-track">{track.title}</li>
              );
            })
          }
        </ul>
      </div>
    );
  }
});
