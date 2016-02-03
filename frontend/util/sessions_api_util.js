var CurrentUserActions = require("../actions/current_user_actions");

module.exports = {
  login: function (credentials, success) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      data: credentials,
      success: function (currentUser) {
        CurrentUserActions.receiveCurrentUser(currentUser);
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
        if (callback) callback(currentUser);
      },
      error: function (data) {
        console.log(data);
      }
    });
  }
};
