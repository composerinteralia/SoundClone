var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    PlayerConstants = require('../constants/player_constants'),
    TrackStore = require('./track')
    Cache = require('../lib/cache');

var _trackCache = new Cache(50),
    _mountedTracks = {},
    _currentTrack = null,
    PlayerStore = new Store(AppDispatcher);

var add = function (track) {
  _mountedTracks[track.trackInfo.id] = track;
};

var remount = function (trackId, container, height, visible) {
  var cached = _trackCache.remove(trackId).value;

  cached.wavesurfer.remount(container, height, visible);

  _mountedTracks[trackId] = cached
};

var unmount = function (trackId) {
  var currentlyPlaying = false;
  if (isCurrentTrack(trackId)) {
    currentlyPlaying = true;
  }

  var track = _mountedTracks[trackId]

  if (track) {
    track.wavesurfer.dismount(currentlyPlaying);
    _trackCache.add(trackId, track)
    delete _mountedTracks[trackId]
  }

};

var isCurrentTrack = function (trackId) {
  return (_currentTrack && _currentTrack.trackInfo.id === trackId);
}

var play = function (trackId) {
  pause();

  _currentTrack = _mountedTracks[trackId];
  _currentTrack.wavesurfer.play();
};

var pause = function () {
  _currentTrack && _currentTrack.wavesurfer.pause();
};

var playPause = function () {
  _currentTrack && _currentTrack.wavesurfer.playPause();
}

var playNext = function () {
  var nextTrack = TrackStore.next(_currentTrack.trackInfo.id);

  play(nextTrack.id)
}

var playPrev = function () {
  var prevTrack = TrackStore.prev(_currentTrack.trackInfo.id);

  play(prevTrack.id)
}

var destroy = function (trackId) {
  _mountedTracks[trackId].wavesurfer.destroy()

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
      add(payload.track);
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
    case PlayerConstants.NEXT:
      playNext();
      break;
    case PlayerConstants.PREV:
      playPrev();
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
  return !!_mountedTracks[trackId] || _trackCache.includes(trackId)
};

PlayerStore.track = function () {
  return (_currentTrack && _currentTrack.trackInfo) || undefined ;
};

PlayerStore.isCurrentTrack = function (trackId) {
  return _currentTrack && _currentTrack.trackInfo.id === parseInt(trackId);
};

PlayerStore.isPlaying = function () {
  return !!_currentTrack && _currentTrack.wavesurfer.isPlaying();
};

PlayerStore.currentTime = function () {
  return (_currentTrack && _currentTrack.wavesurfer.getCurrentTime()) || 0;
};

PlayerStore.totalTime = function () {
  return (_currentTrack && _currentTrack.wavesurfer.getDuration()) || 0;
};

module.exports = PlayerStore;
