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
  }
};
