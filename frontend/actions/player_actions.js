var AppDispatcher = require('../dispatcher/dispatcher'),
    PlayerConstants = require('../constants/player_constants');

module.exports = {
  receiveWavesurfer: function (wavesurfer) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.RECEIVED,
      wavesurfer: wavesurfer
    });
  },

  remountWavesurfer: function (container, height, visible) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.REMOUNTED,
      container: container,
      height: height,
      visible: visible
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

  pause: function () {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PAUSED
    });
  },

  destroy: function (trackId) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.DESTROYED,
      trackId: trackId
    });
  },

  reset: function () {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.RESET
    });
  },

  progress: function () {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PROGRESS
    })
  }
};
