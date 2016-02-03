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
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
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
      success: function (user) {
        ApiActions.receiveUsers([user]);
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
      success: function (user) {
        CurrentUserActions.receiveCurrentUser(user);
        ApiActions.receiveUsers([user]);
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
      success: function (tracks) {
        ApiActions.receiveTracks(tracks);
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  fetchUserTracks: function (userId) {
    $.ajax({
      url: "api/users/" + userId + "/tracks",
      success: function (tracks) {
        ApiActions.receiveTracks(tracks);
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  fetchSingleTrack: function (trackId, success) {
    $.ajax({
      url: "api/tracks/" + trackId,
      success: function (track) {
        ApiActions.receiveTracks([track]);
        if (success) success();
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
      success: function (track) {
        ApiActions.receiveSingleTrack(track);
        if (success) success(track.id);
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
      success: function (track) {
        ApiActions.receiveSingleTrack(track);
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
      success: function (track) {
        ApiActions.removeTrack(track);
        DialogActions.clearDialog();
        if (success) success();
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  createLike: function (trackId, success) {
    $.ajax({
      url: "/api/tracks/" + trackId + "/like",
      method: "post",
      success: function (track) {
        ApiActions.receiveTracks([track]);
        if (success) success();
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  destroyLike: function (trackId, success) {
    $.ajax({
      url: "/api/tracks/" + trackId + "/like",
      method: "delete",
      success: function (track) {
        ApiActions.receiveTracks([track]);
        if (success) success();
      },
      error: function (data) {
        console.log(data);
      }
    });
  }
};
