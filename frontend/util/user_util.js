var ApiActions = require('../actions/api_actions'),
    ModalActions = require('../actions/modal_actions'),
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
  }
};
