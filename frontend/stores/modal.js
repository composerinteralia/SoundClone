var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    ModalConstants = require('../constants/modal_constants');

var _modal = null,
    ModalStore = new Store(AppDispatcher);

ModalStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ModalConstants.MODAL_RECEIVED:
      _modal = payload.modal;
      ModalStore.__emitChange();
      break;
    case ModalConstants.MODAL_DESTROYED:
      _modal = null;
      ModalStore.__emitChange();
      break;
  }
};

ModalStore.get = function () {
  return _modal;
};

module.exports = ModalStore;
