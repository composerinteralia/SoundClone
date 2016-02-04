var CurrentUserActions = require("../actions/current_user_actions"),
    LikeActions = require('../actions/like_actions');

module.exports = {
  login: function (credentials, success) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      data: credentials,
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        LikeActions.receiveLikes(currentUser.liked_track_ids);
        if (success) success();
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  logout: function (callback) {
    $.ajax({
      url: '/api/session',
      type: 'delete',
      success: function (emptyObject) {
        CurrentUserActions.receiveCurrentUser(emptyObject);
        if (callback) callback();
      },
      error: function (data) {
        console.log(data);
      }
    });
  },

  fetchCurrentUser: function (callback) {
    $.ajax({
      url: '/api/session',
      type: 'GET',
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
        LikeActions.receiveLikes(currentUser.liked_track_ids);
        if (callback) callback(currentUser);
      },
      error: function (data) {
        console.log(data);
      }
    });
  }
};
