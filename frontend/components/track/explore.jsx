var React = require('react'),
    TrackStore = require('../../stores/track'),
    ApiUtil = require('../../util/api_util');

module.exports = React.createClass({
  getInitialState: function () {
    return { tracks: null };
  },

  componentDidMount: function () {
    this.onChangeToken = TrackStore.addListener(this._onChange);

    ApiUtil.fetchAllTracks();
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
  },

  render: function () {
    var tracks = this.state.tracks;

    if (tracks === null) {
      return <div>Loading...</div>;
    }
// use index_item, but conditionals for buttons

    return (
      <main className="content">
        {this.state.modal}
        <ul>
          {
            tracks.map(function (track) {
              return (
                <li key={track.id} className="user-track">
                  {track.title}
                </li>
              );
            })
          }
        </ul>
      </main>
    );
  },

  _onChange: function () {
    var tracks = TrackStore.all();
    this.setState({ tracks: tracks });
  }
});
