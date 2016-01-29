var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    AudioConstants = require('../constants/audio_constants');

var _audio = null,
    AudioStore = new Store(AppDispatcher);

var reset = function (src) {
  if (_audio.src !== src) {
    _audio.src = src;
  }
};

var mount = function (audio) {
  _audio = audio
  $('body').append(audio)
}

AudioStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AudioConstants.MOUNTED:
      mount(payload.audio)
      AudioStore.__emitChange;
      break;
    case AudioConstants.PLAYED:
      reset(payload.src);
      _audio.play();
      AudioStore.__emitChange();
      break;
    case AudioConstants.PAUSED:
      _audio.pause()
      AudioStore.__emitChange();
      break;
  }
};

module.exports = AudioStore;
