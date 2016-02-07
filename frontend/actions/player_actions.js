var AppDispatcher = require('../dispatcher/dispatcher'),
    PlayerConstants = require('../constants/player_constants');

module.exports = {
  receiveWavesurfer: function (wavesurfer) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.RECEIVED,
      wavesurfer: wavesurfer
    });
  },

  remountWavesurfer: function (trackId, container, height, visible, onAudioprocess) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.REMOUNTED,
      trackId: trackId,
      container: container,
      height: height,
      visible: visible
    });
  },

  unmountWavesurfer: function (trackId) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.UNMOUNTED,
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
