var React = require('react'),
    TrackStore = require('../../stores/track'),
    TrackUtil = require('../../util/track_util'),
    ExploreIndexItem = require('./explore_index_item'),
    Spinner = require('../spinner');

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
      return <Spinner />;
    }

    return (
      <main className="content explore-content">
        {this.state.modal}

          <header className="tracks-header">
            <h2 className="tracks-title">Explore new sounds!</h2>
          </header>

          <ul className="group">
            {tracks.map(function (track) {
              return <ExploreIndexItem key={track.id} track={track} />;
            })}
          </ul>

      </main>
    );
  },

  _onChange: function () {
    var tracks = TrackStore.all();
    this.setState({ tracks: tracks });
  }
});
