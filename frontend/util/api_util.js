var ApiActions = require('../actions/api_actions'),
    ModalActions = require('../actions/modal_actions');

module.exports = {
  logout: function () {
    $.ajax({
      url: "api/session",
      method: "delete",
      success: function (data) {
        console.log('logged_out');
        // this will eventually trigger a redirect
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

  updateUser: function (user_id, user) {
    $.ajax({
      url: "api/users/" + user_id,
      method: "patch",
      data: { user: user },
      success: function (data) {
        ApiActions.receiveUsers([data]);
        ModalActions.destroyModal();
      },
      error: function (data) {
        // put the error message on the form
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

  // also for track show page
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

  updateTrack: function (track_id, track) {
    $.ajax({
      url: "api/tracks/" + track_id,
      method: "patch",
      data: { track: track },
      success: function (data) {
        ApiActions.receiveUsers([data]);
        ModalActions.destroyModal();
      }
    });
  },

  destroyTrack: function (track_id) {
    $.ajax({
      url: "api/tracks/" + track_id,
      method: "delete",
      success: function (data) {
        ApiActions.receiveUsers([data]);
      }
    });
  }

};
