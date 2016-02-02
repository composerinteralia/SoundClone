var ApiActions = require('../actions/api_actions'),
    ModalActions = require('../actions/modal_actions'),
    DialogActions = require('../actions/dialog_actions'),
    CurrentUserActions = require('../actions/current_user_actions');

module.exports = {
  createUser: function (formData, success) {
    $.ajax({
      url: "/api/users",
      method: "post",
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        CurrentUserActions.receiveCurrentUser(data);
        ModalActions.destroyModal();
        if (success) success();
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  fetchUser: function (userId) {
    $.ajax({
      url: "/api/users/" + userId,
      success: function (data) {
        ApiActions.receiveUsers([data]);
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  updateUser: function (formData) {
    $.ajax({
      url: "/api/user",
      method: "patch",
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        CurrentUserActions.receiveCurrentUser(data);
        ModalActions.destroyModal();
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  fetchExploreTracks: function () {
    $.ajax({
      url: "api/tracks/explore",
      success: function (data) {
        ApiActions.receiveTracks(data);
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  fetchUserTracks: function (userId) {
    $.ajax({
      url: "api/users/" + userId + "/tracks",
      success: function (data) {
        ApiActions.receiveTracks(data);
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  fetchSingleTrack: function (trackId) {
    $.ajax({
      url: "api/tracks/" + trackId,
      success: function (data) {
        ApiActions.receiveTracks([data]);
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  createTrack: function (formData, success) {
    $.ajax({
      url: "api/tracks",
      method: "post",
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        ApiActions.receiveSingleTrack(data);
        if (success) success();
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  updateTrack: function (trackId, formData) {
    $.ajax({
      url: "/api/tracks/" + trackId,
      method: "patch",
      processData: false,
      contentType: false,
      data: formData,
      success: function (data) {
        ApiActions.receiveSingleTrack(data);
        ModalActions.destroyModal();
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  destroyTrack: function (trackId, success) {
    $.ajax({
      url: "/api/tracks/" + trackId,
      method: "delete",
      success: function (data) {
        ApiActions.removeTrack(data);
        DialogActions.clearDialog();
        if (success) success();
      },
      error: function (data) {
        console.log(data);
      }
    });
  }
};
