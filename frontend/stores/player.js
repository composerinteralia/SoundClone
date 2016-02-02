var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    PlayerConstants = require('../constants/player_constants');

var _wavesurfers = [],
    // _wavesurfers = {}
    _currentWavesurfer = null,
    PlayerStore = new Store(AppDispatcher);

var add = function (wavesurfer) {
  // if (_currentWavesurfer && !_currentWavesurfer.wavesurfer.isPlaying()) {
  //   _currentWavesurfer.wavesurfer.play();
  // }
console.log(_currentWavesurfer)
  // _wavesurfers[wavesurfer.track.id] = wavesurfer
  _wavesurfers.push(wavesurfer);
};

var findWavesurfer = function (trackId) {
  // _wavesurfers[trackId]
  return _wavesurfers.find(function (wavesurfer) {
    return wavesurfer.track.id === trackId;
  });
};

var remove = function (trackId) {
  // delete _wavesurfers[trackId]
  if (_currentWavesurfer && _currentWavesurfer.track.id === trackId) return;
  var wavesurfer = findWavesurfer(trackId);

  if (wavesurfer) {
    var index = _wavesurfers.indexOf(wavesurfer);

    _wavesurfers.splice(index, 1);
  }

};

var play = function (trackId) {
  //refactor
  if (!_currentWavesurfer) {
    _currentWavesurfer = findWavesurfer(trackId);
  } else if (_currentWavesurfer && _currentWavesurfer.track.id !== trackId) {
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

    var index = _wavesurfers.indexOf(_currentWavesurfer);
    _wavesurfers.splice(index, 1);
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
  return _currentWavesurfer && _currentWavesurfer.track;
};

PlayerStore.isPlaying = function () {
  return _currentWavesurfer && _currentWavesurfer.wavesurfer.isPlaying();
};

PlayerStore.currentTime = function () {
  var time = _currentWavesurfer.wavesurfer.getCurrentTime();
  return Math.round(time);
};

module.exports = PlayerStore;
