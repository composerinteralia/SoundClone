var AppDispatcher = require('../dispatcher/dispatcher'),
    UserConstants = require('../constants/user_constants');

module.exports = {
  receiveUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: users
    });
  }
};
