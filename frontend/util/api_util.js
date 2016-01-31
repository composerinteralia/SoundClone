var ApiActions = require('../actions/api_actions'),
    ModalActions = require('../actions/modal_actions'),
    CurrentUserActions = require('../actions/current_user_actions');

module.exports = {
  createUser: function (user, success) {
    $.ajax({
      url: "/api/users",
      method: "post",
      data: {user: user},
      success: function (data) {
        CurrentUserActions.receiveCurrentUser(data);
        ModalActions.destroyModal();
        if (success) success()
      },
      error: function (data) {
        console.log(data)
      }
    });
  },

  fetchUser: function (user_id) {
    $.ajax({
      url: "/api/users/" + user_id,
      success: function (data) {
        ApiActions.receiveUsers([data]);
      },
      error: function (data) {
        console.log(data)
      }
    });
  },

  updateUser: function (user) {
    $.ajax({
      url: "/api/user",
      method: "patch",
      data: { user: user },
      success: function (data) {
        ApiActions.receiveUsers([data]);
        CurrentUserActions.receiveCurrentUser(data);
        ModalActions.destroyModal();
      },
      error: function (data) {
        console.log(data)
      }
    });
  },

  fetchAllTracks: function () {
    $.ajax({
      url: "api/tracks",
      success: function (data) {
        ApiActions.receiveTracks(data);
      },
      error: function (data) {
        console.log(data)
      }
    });
  },

  fetchSingleTrack: function (track_id) {
    $.ajax({
      url: "api/tracks/" + track_id,
      success: function (data) {
        ApiActions.receiveTracks([data]);
      },
      error: function (data) {
        console.log(data)
      }
    });
  },

  createTrack: function (track) {
    $.ajax({
      url: "api/tracks",
      method: "post",
      data: { track: track },
      success: function (data) {
        ApiActions.receiveUsers([data]);
      },
      error: function (data) {
        console.log(data)
      }
    });
  },

  updateTrack: function (track_id, track) {
    $.ajax({
      url: "/api/tracks/" + track_id,
      method: "patch",
      data: { track: track },
      success: function (data) {
        ApiActions.receiveUsers([data]);
        ModalActions.destroyModal();
      },
      error: function (data) {
        console.log(data)
      }
    });
  },

  destroyTrack: function (track_id) {
    $.ajax({
      url: "/api/tracks/" + track_id,
      method: "delete",
      success: function (data) {
        ApiActions.receiveUsers([data]);
      },
      error: function (data) {
        console.log(data)
      }
    });
  }
};
