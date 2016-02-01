var AppDispatcher = require('../dispatcher/dispatcher'),
    UserConstants = require('../constants/user_constants'),
    TrackConstants = require('../constants/track_constants');

module.exports = {
  receiveUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  },

  receiveTracks: function (tracks) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACKS_RECEIVED,
      tracks: tracks
    });
  },

  receiveSingleTrack: function (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.SINGLE_TRACK_RECEIVED,
      track: track
    });
  },

  removeTrack: function (track) {
    AppDispatcher.dispatch({
      actionType: TrackConstants.TRACK_REMOVED,
      track: track
    });
  }
};
