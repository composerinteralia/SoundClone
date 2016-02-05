var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    TrackConstants = require('../constants/track_constants');

var _tracks = [],
    TrackStore = new Store(AppDispatcher);

var reset = function (tracks) {
  _tracks = tracks.slice();
};

var remove = function (removedTrack) {
  var track = _tracks.find(function (track) {
    return track.id === removedTrack.id;
  });

  if (track) {
    var index = _tracks.indexOf(track);
    _tracks.splice(index, 1);
  }
};

var update = function (newTrack) {
  var oldTrack = _tracks.find(function (track) {
    return track.id === newTrack.id;
  });

  if (oldTrack) {
    var index = _tracks.indexOf(oldTrack);
    _tracks[index] = newTrack;
  }
};

TrackStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TrackConstants.TRACKS_RECEIVED:
      reset(payload.tracks);
      TrackStore.__emitChange();
      break;
    case TrackConstants.SINGLE_TRACK_RECEIVED:
      update(payload.track);
      TrackStore.__emitChange();
      break;
    case TrackConstants.TRACK_REMOVED:
      remove(payload.track);
      TrackStore.__emitChange();
      break;
  }
};

TrackStore.find = function (trackId) {
  return _tracks.find(function (track) {
    return track.id === parseInt(trackId);
  });
};

TrackStore.all = function () {
  return _tracks.slice();
};

TrackStore.next = function (currentTrack) {
  var oldTrack = _tracks.find(function (track) {
    return track.id === currentTrack.id;
  });

  var index = -1;
  if (oldTrack) {
    index = _tracks.indexOf(oldTrack);
  }

  index += 1;
  if (index === _tracks.length) {
    index = 0;
  }

  return _tracks[index];
};

TrackStore.prev = function (currentTrack) {
  var oldTrack = _tracks.find(function (track) {
    return track.id === currentTrack.id;
  });

  var index = _tracks.length;
  if (oldTrack) {
    index = _tracks.indexOf(oldTrack);
  }

  index -= 1;
  if (index === -1) {
    index += _tracks.length;
  }

  return _tracks[index];
};

module.exports = TrackStore;
