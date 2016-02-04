var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    PlayerConstants = require('../constants/player_constants');

var _wavesurfers = {},
    _currentWavesurfer = null,
    PlayerStore = new Store(AppDispatcher);

var add = function (wavesurfer) {
  _wavesurfers[wavesurfer.track.id] = wavesurfer;
};

var remount = function (container, waveType) {
  var child = _currentWavesurfer.wavesurfer.container.children[0];
  container.appendChild(child);
  _currentWavesurfer.wavesurfer.container = container;
  add(_currentWavesurfer);
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
  if (_currentWavesurfer && _currentWavesurfer.track.id === trackId) {
    pause();
    _currentWavesurfer = null;
  }
};

PlayerStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PlayerConstants.RECEIVED:
      add(payload.wavesurfer);
      PlayerStore.__emitChange();
      break;
    case PlayerConstants.REMOUNTED:
      remount(payload.container, payload.waveType);
      PlayerStore.__emitChange();
      break;
    case PlayerConstants.REMOVED:
      remove(payload.trackId);
      PlayerStore.__emitChange();
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

PlayerStore.wavesurferExists = function (containerClass) {
  return _currentWavesurfer &&
    _currentWavesurfer.wavesurfer.container.classList[1] === containerClass;
};

PlayerStore.track = function () {
  return (_currentWavesurfer && _currentWavesurfer.track) || undefined ;
};

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
