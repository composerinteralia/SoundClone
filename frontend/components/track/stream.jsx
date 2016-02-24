var React = require('react'),
    TrackStore = require('../../stores/track'),
    TrackUtil = require('../../util/track_util'),
    TrackIndexItem = require('./index_item'),
    Spinner = require('../spinner');

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
      return <Spinner />;
    }

    return (
      <main className="content">
        {this.state.modal}

        <section className="tracks">

          <header className="tracks-header">
            <h2 className="tracks-title">Stream</h2>
            <p>Hear the latests posts from the people you follow</p>
          </header>

          <ul className="tracks-list">
            {tracks.map(function (track) {
              return <TrackIndexItem key={track.id} track={track} />;
            })}
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
