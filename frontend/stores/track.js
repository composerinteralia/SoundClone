var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    TrackConstants = require('../constants/track_constants');

var _tracks = [],
    TrackStore = new Store(AppDispatcher);

var reset = function (tracks) {
  _tracks = tracks.slice();
};

TrackStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TrackConstants.TRACKS_RECEIVED:
      reset(payload.tracks);
      TrackStore.__emitChange();
      break;
  }
};

TrackStore.find = function (track_id) {
  return _tracks.find(function (track) {
    return track.id === track_id;
  });
};

module.exports = TrackStore;
