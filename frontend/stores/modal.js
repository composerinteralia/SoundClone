var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    ModalConstants = require('../constants/modal_constants');

var _modal = null,
    ModalStore = new Store(AppDispatcher);

var reset = function (modal) {
  _modal = modal;
};

var remove = function () {
  _modal = null;
};

ModalStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ModalConstants.MODAL_RECEIVED:
      reset(payload.modal);
      ModalStore.__emitChange();
      break;
    case ModalConstants.MODAL_DESTROYED:
      remove();
      ModalStore.__emitChange();
      break;
  }
};

ModalStore.get = function () {
  return _modal;
};

module.exports = ModalStore;
