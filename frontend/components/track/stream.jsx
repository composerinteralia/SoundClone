var React = require('react'),
    TrackStore = require('../../stores/track'),
    TrackUtil = require('../../util/track_util'),
    TrackIndexItem = require('./index_item');

module.exports = React.createClass({
  getInitialState: function () {
    return { tracks: null };
  },

  componentDidMount: function () {
    this.onChangeToken = TrackStore.addListener(this._onChange);

    TrackUtil.fetchStreamTracks();
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
          <h2>Stream</h2>
          <p>Hear the latests posts from the people you are following</p>
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
