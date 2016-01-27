var ApiActions = require('../actions/api_actions');

module.exports = {
  logout: function () {
    $.ajax({
      url: "api/session",
      method: "delete",
      success: function (data) {
        console.log('logged_out');
      }
    });
  },

  fetchUser: function (user_id) {
    $.ajax({
      url: "api/users/" + user_id,
      success: function (data) {
        ApiActions.receiveUsers([data]);
      }
    });
  },

  // don't actually need this right now, useful for 'explore'
  fetchAllTracks: function () {
    $.ajax({
      url: "api/tracks",
      success: function (data) {
        ApiActions.receiveTracks(data);
      }
    });
  },

  // for track show page
  fetchSingleTrack: function (track_id) {
    $.ajax({
      url: "api/tracks/" + track_id,
      success: function (data) {
        ApiActions.receiveTracks([data]);
      }
    });
  },

  // upload form
  createTrack: function (track) {
    $.ajax({
      url: "api/tracks",
      method: "post",
      data: { track: track },
      success: function (data) {
        ApiActions.receiveUsers([data]);
      }
    });
  },

  // update button partial
  updateTrack: function (track_id, track) {
    $.ajax({
      url: "api/tracks/" + track_id,
      method: "patch",
      data: { track: track },
      success: function (data) {
        ApiActions.receiveUsers([data]);
      }
    });
  },

  // a little popup - "are you sure?""
  destroyTrack: function (track_id) {
    $.ajax({
      url: "api/tracks/" + track_id,
      method: "destroy",
      success: function (data) {
        ApiActions.receiveUsers([data]);
      }
    });
  }

};
