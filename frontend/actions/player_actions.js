var AppDispatcher = require('../dispatcher/dispatcher'),
    PlayerConstants = require('../constants/player_constants');

module.exports = {
  receiveWavesurfer: function (wavesurfer) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.RECEIVED,
      wavesurfer: wavesurfer
    });
  },

  removeWavesurfer: function (trackId) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.REMOVED,
      trackId: trackId
    });
  },

  play: function (trackId) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAYED,
      trackId: trackId
    });
  },

  pause: function (trackId) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PAUSED,
      trackId: trackId
    });
  },

  destroy: function (trackId) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.DESTROYED,
      trackId: trackId
    });
  }
};
