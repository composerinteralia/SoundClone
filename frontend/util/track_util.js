var ApiActions = require('../actions/api_actions'),
    ModalActions = require('../actions/modal_actions'),
    FormActions = require('../actions/form_actions');

module.exports = {
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

  fetchStreamTracks: function () {
    $.ajax({
      url: "api/tracks/stream",
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
        if (success) success(track);
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  createTrack: function (formData, success, error) {
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
        FormActions.receiveMessages(data.responseJSON);
        if (error) error();
      }
    });
  },

  updateTrack: function (trackId, formData, error) {
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
        FormActions.receiveMessages(data.responseJSON);
        if (error) error();
      }
    });
  },

  destroyTrack: function (trackId, success) {
    $.ajax({
      url: "/api/tracks/" + trackId,
      method: "delete",
      success: function (track) {
        ApiActions.removeTrack(track);
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
        ApiActions.receiveSingleTrack(track);
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
        ApiActions.receiveSingleTrack(track);
      },
      error: function (data) {
        console.log(data);
      }
    });
  }
};
