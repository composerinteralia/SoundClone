var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    DialogConstants = require('../constants/dialog_constants');

var _dialogs = {},
    DialogStore = new Store(AppDispatcher);

var reset = function (trackId, dialog) {
  _dialogs = {};
  _dialogs[trackId] = dialog
}

DialogStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case DialogConstants.DIALOG_RECEIVED:
      reset(payload.trackId, payload.dialog);
      DialogStore.__emitChange();
      break;
    case DialogConstants.DIALOG_DESTROYED:
      _dialogs = {};
      DialogStore.__emitChange();
      break;
  }
};

DialogStore.find = function (trackId) {
  return _dialogs[trackId];
};

module.exports = DialogStore;
