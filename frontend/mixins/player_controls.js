var PlayerActions = require('../actions/player_actions'),
    TrackStore = require('../stores/track');

module.exports = {
  _playTrack: function (track) {
    PlayerActions.play(track.id);
  },

  _pauseTrack: function () {
    PlayerActions.pause();
  },

  _playNext: function () {
    PlayerActions.playNext()
  },

  _playPrev: function (track) {
    PlayerActions.playPrev()
  }
};
