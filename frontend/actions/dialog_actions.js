var AppDispatcher = require('../dispatcher/dispatcher'),
    DialogConstants = require('../constants/dialog_constants');

module.exports = {
  receiveDialog: function (trackId, dialog) {
    AppDispatcher.dispatch({
      actionType: DialogConstants.DIALOG_RECEIVED,
      trackId: trackId,
      dialog: dialog
    });
  },

  destroyDialog: function () {
    AppDispatcher.dispatch({
      actionType: DialogConstants.DIALOG_DESTROYED,
    });
  }
};
