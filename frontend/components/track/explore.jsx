var React = require('react'),
    TrackStore = require('../../stores/track'),
    TrackUtil = require('../../util/track_util'),
    ExploreIndexItem = require('./explore_index_item');

module.exports = React.createClass({
  getInitialState: function () {
    return { tracks: null };
  },

  componentDidMount: function () {
    this.onChangeToken = TrackStore.addListener(this._onChange);

    TrackUtil.fetchExploreTracks();
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
  },

  render: function () {
    var tracks = this.state.tracks;

    if (tracks === null) {
      return <div>Loading...</div>;
    }

    return (
      <main className="main content">
        {this.state.modal}
        <section className="tracks">
          <h2>Explore</h2>
          <ul className="group">
            {
              tracks.map(function (track) {
                return (
                  <ExploreIndexItem key={track.id} track={track} />
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
