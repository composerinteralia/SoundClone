var React = require('react'),
    TrackStore = require('../../stores/track'),
    ApiUtil = require('../../util/api_util'),
    TrackIndexItem = require('./index_item');

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
// use index_item for now, but conditionals for buttons
    return (
      <main className="main content">
        {this.state.modal}
        <section className="tracks">
          <h2>Explore</h2>
          <ul className="tracks-list">
            {
              tracks.map(function (track) {
                return (
                  <TrackIndexItem key={track.id} track={track} />
                );
              })
            }
          </ul>
        </section>
      </main>
    );
  },

  _onChange: function () {
    var tracks = TrackStore.all();
    this.setState({ tracks: tracks });
  }
});
