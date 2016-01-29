var AppDispatcher = require('../dispatcher/dispatcher'),
    AudioConstants = require('../constants/audio_constants');

module.exports = {
  mount: function (audio) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.MOUNTED,
      audio: audio
    });
  },

  play: function (src) {
    AppDispatcher.dispatch({
      actionType: AudioConstants.PLAYED,
      src: src
    });
  },

  pause: function () {
    AppDispatcher.dispatch({
      actionType: AudioConstants.PAUSED,
    });
  }
};
