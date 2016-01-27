var AppDispatcher = require('../dispatcher/dispatcher'),
    ModalConstants = require('../constants/modal_constants');

module.exports = {
  receiveModal: function (modal) {
    AppDispatcher.dispatch({
      actionType: ModalConstants.MODAL_RECEIVED,
      modal: modal
    });
  },

  destroyModal: function () {
    AppDispatcher.dispatch({
      actionType: ModalConstants.MODAL_DESTROYED,
    });
  }
};
