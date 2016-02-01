var AppDispatcher = require('../dispatcher/dispatcher'),
    AudioConstants = require('../constants/audio_constants');

module.exports = {
  mount: function (audio) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.MOUNTED,
      audio: audio
    });
  },

  play: function (track) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.PLAYED,
      track: track
    });
  },

  pause: function () {
    AppDispatcher.dispatch({
      actionType: AudioConstants.PAUSED,
    });
  }
};
