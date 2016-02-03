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

var update = function (track) {
  remove(track);
  _tracks.unshift(track);
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

TrackStore.next = function (prevTrack) {
  var index = _tracks.indexOf(prevTrack);
  return _tracks[index + 1];
};

TrackStore.prev = function (prevTrack) {
  var index = _tracks.indexOf(prevTrack);
  return _tracks[index - 1];
};

module.exports = TrackStore;
