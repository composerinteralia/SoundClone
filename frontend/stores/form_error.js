var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    FormConstants = require('../constants/dialog_constants');

var _messages = [],
    FormErrorStore = new Store(AppDispatcher);

var reset = function (messages) {
  _messages = messages;
};

var clear = function () {
  _messages = [];
};

FormErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case FormConstants.MESSAGES_RECEIVED:
      reset(payload.messages);
      FormErrorStore.__emitChange();
      break;
    case FormConstants.MESSAGES_CLEARED:
      clear();
      FormErrorStore.__emitChange();
      break;
  }
};

FormErrorStore.all = function (trackId) {
  return _messages.slice();
};

module.exports = FormErrorStore;
