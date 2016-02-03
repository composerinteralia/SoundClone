var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    PlayerConstants = require('../constants/player_constants');

var _wavesurfers = {},
    _currentWavesurfer = null,
    PlayerStore = new Store(AppDispatcher);

var add = function (wavesurfer) {
  _wavesurfers[wavesurfer.track.id] = wavesurfer;
};

var findWavesurfer = function (trackId) {
  return _wavesurfers[trackId];
};

var remove = function (trackId) {
  delete _wavesurfers[trackId];
};

var play = function (trackId) {
  if (!_currentWavesurfer) {
    _currentWavesurfer = findWavesurfer(trackId);
  } else if (_currentWavesurfer.track.id !== trackId) {
    _currentWavesurfer.wavesurfer.pause();
    _currentWavesurfer = findWavesurfer(trackId);
  }

  _currentWavesurfer.wavesurfer.play();
};

var pause = function () {
  _currentWavesurfer.wavesurfer.pause();
};

var destroy = function (trackId) {
  if (_currentWavesurfer.track.id === trackId) {
    _currentWavesurfer.wavesurfer.stop();
    _currentWavesurfer = null;
  }
};

PlayerStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PlayerConstants.RECEIVED:
      add(payload.wavesurfer);
      break;
    case PlayerConstants.REMOVED:
      remove(payload.trackId);
      break;
    case PlayerConstants.PLAYED:
      play(payload.trackId);
      PlayerStore.__emitChange();
      break;
    case PlayerConstants.PAUSED:
      pause();
      PlayerStore.__emitChange();
      break;
    case PlayerConstants.DESTROYED:
      destroy(payload.trackId);
      PlayerStore.__emitChange();
      break;
  }
};

PlayerStore.track = function () {
  return (_currentWavesurfer && _currentWavesurfer.track) || undefined ;
};

// PlayerStore.wavesurfer = function () {
//   return _currentWavesurfer
// }

PlayerStore.isPlaying = function () {
  return _currentWavesurfer && _currentWavesurfer.wavesurfer.isPlaying();
};

PlayerStore.currentTime = function () {
  return (_currentWavesurfer && _currentWavesurfer.wavesurfer.getCurrentTime()) || 0;
};

PlayerStore.totalTime = function () {
  return (_currentWavesurfer && _currentWavesurfer.wavesurfer.getDuration()) || 0;
};

module.exports = PlayerStore;
