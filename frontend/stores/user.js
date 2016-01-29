var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    UserConstants = require('../constants/user_constants');

var _users = [],
    UserStore = new Store(AppDispatcher);

var reset = function (users) {
  _users = users.slice();
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.USERS_RECEIVED:
      reset(payload.users);
      UserStore.__emitChange();
  }
};

UserStore.find = function (user_id) {
  return _users.find(function (user) {
    return user.id === parseInt(user_id);
  });
};

module.exports = UserStore;
