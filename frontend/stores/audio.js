var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    AudioConstants = require('../constants/audio_constants');

var _audio = null,
    _track = null,
    AudioStore = new Store(AppDispatcher);

var reset = function (track) {
  _audio.src = track.audio_url;
  _track = track;
};

var mount = function (audio) {
  _audio = audio;
  $('body').append(audio);
};

AudioStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AudioConstants.MOUNTED:
      mount(payload.audio);
      AudioStore.__emitChange();
      break;
    case AudioConstants.PLAYED:
      reset(payload.track);
      _audio.play();
      AudioStore.__emitChange();
      break;
    case AudioConstants.PAUSED:
      _audio.pause();
      AudioStore.__emitChange();
      break;
  }
};

AudioStore.track = function () {
  return _track;
};

AudioStore.paused = function () {
  return _audio.paused;
};

module.exports = AudioStore;
