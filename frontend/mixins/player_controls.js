var PlayerActions = require('../actions/player_actions'),
    TrackStore = require('../stores/track');

module.exports = {
  _playTrack: function (track) {
    PlayerActions.play(track.id);
  },

  _pauseTrack: function () {
    PlayerActions.pause();
  },

  _playNext: function (track) {
    var nextTrack = TrackStore.next(track);

    if (nextTrack) {
      PlayerActions.play(nextTrack.id);
    }
  },

  _playPrev: function (track) {
    var prevTrack = TrackStore.prev(track);

    if (prevTrack) {
      PlayerActions.play(prevTrack.id);
    }
  }
};
