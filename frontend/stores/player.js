var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    PlayerConstants = require('../constants/player_constants');

// fine for now, but need a cache
var _tracks = {},
    _currentTrack = null,
    PlayerStore = new Store(AppDispatcher);

var add = function (wavesurfer) {
  _tracks[wavesurfer.track.id] = wavesurfer;
};

var remount = function (trackId, container, height, visible) {
  findTrack(trackId).wavesurfer.remount(container, height, visible);
};

var unmount = function (trackId) {
  var currentlyPlaying = false;
  if (isCurrentTrack(trackId)) {
    currentlyPlaying = true;
  }

  findTrack(trackId).wavesurfer.dismount(currentlyPlaying);
};

var isCurrentTrack = function (trackId) {
  return (_currentTrack && _currentTrack.track.id === trackId)
}

var findTrack = function (trackId) {
  if (isCurrentTrack(trackId)) {
    return _currentTrack
  }

  return _tracks[trackId];
};

var play = function (trackId) {
  pause();

  _currentTrack = findTrack(trackId);
  _currentTrack.wavesurfer.play();
};

var pause = function () {
  _currentTrack && _currentTrack.wavesurfer.pause();
};

var playPause = function () {
  _currentTrack && _currentTrack.wavesurfer.playPause();
}

var destroy = function (trackId) {
  findTrack(trackId).wavesurfer.destroy()

  if (isCurrentTrack(trackId)) {
    _currentTrack = null;
  }
};

var reset = function () {
  if (_currentTrack) {
    pause();
    _currentTrack = null;
  }
};

PlayerStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PlayerConstants.RECEIVED:
      add(payload.wavesurfer);
      PlayerStore.__emitChange();
      break;
    case PlayerConstants.REMOUNTED:
      remount(
        payload.trackId,
        payload.container,
        payload.height,
        payload.visible
      );
      PlayerStore.__emitChange();
      break;
    case PlayerConstants.UNMOUNTED:
      unmount(payload.trackId);
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
    case PlayerConstants.PLAY_PAUSED:
      playPause();
      PlayerStore.__emitChange();
      break;
    case PlayerConstants.DESTROYED:
      destroy(payload.trackId);
      PlayerStore.__emitChange();
      break;
    case PlayerConstants.RESET:
      reset();
      PlayerStore.__emitChange();
      break;
    case PlayerConstants.PROGRESS:
      PlayerStore.__emitChange();
      break;
  }
}

PlayerStore.wavesurferExists = function (trackId) {
  return !!findTrack(trackId)
};

PlayerStore.track = function () {
  return (_currentTrack && _currentTrack.track) || undefined ;
};

PlayerStore.isCurrentTrack = function (trackId) {
  return _currentTrack && _currentTrack.track.id === parseInt(trackId);
};

PlayerStore.isPlaying = function () {
  return _currentTrack && _currentTrack.wavesurfer.isPlaying();
};

PlayerStore.currentTime = function () {
  return (_currentTrack && _currentTrack.wavesurfer.getCurrentTime()) || 0;
};

PlayerStore.totalTime = function () {
  return (_currentTrack && _currentTrack.wavesurfer.getDuration()) || 0;
};

module.exports = PlayerStore;
