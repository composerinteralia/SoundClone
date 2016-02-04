var AppDispatcher = require('../dispatcher/dispatcher'),
    LikeConstants = require('../constants/like_constants');

module.exports = {
  receiveLikes: function (likes) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.LIKES_RECEIVED,
      likes: likes
    });
  },

  receiveSingleLike: function (like) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.SINGLE_LIKE_RECEIVED,
      like: like
    });
  },

  destroyLike: function (like) {
    AppDispatcher.dispatch({
      actionType: LikeConstants.LIKE_DESTROYED,
      like: like
    });
  }
};
