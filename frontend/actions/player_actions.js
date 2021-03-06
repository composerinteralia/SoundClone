var AppDispatcher = require('../dispatcher/dispatcher'),
    PlayerConstants = require('../constants/player_constants');

module.exports = {
  receiveWavesurfer: function (track) {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.RECEIVED,
      track: track
    });
  },

  remountWavesurfer: function (trackId, container, height, visible) {
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

  playPause: function () {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PLAY_PAUSED
    });
  },

  playNext: function () {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.NEXT
    });
  },

  playPrev: function () {
    AppDispatcher.dispatch({
      actionType: PlayerConstants.PREV
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
