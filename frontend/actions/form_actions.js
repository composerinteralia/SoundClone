var AppDispatcher = require('../dispatcher/dispatcher'),
    FormConstants = require('../constants/modal_constants');

module.exports = {
  receiveMessages: function (messages) {
    AppDispatcher.dispatch({
      actionType: FormConstants.MESSAGES_RECEIVED,
      messages: messages
    });
  },

  clearMessages: function () {
    AppDispatcher.dispatch({
      actionType: FormConstants.MESSAGES_CLEARED,
    });
  }
};
