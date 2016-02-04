var AppDispatcher = require('../dispatcher/dispatcher'),
    Store = require('flux/utils').Store,
    LikeConstants = require('../constants/like_constants');

var _likes = [],
    LikeStore = new Store(AppDispatcher);

var reset = function (likes) {
  _likes = likes;
};

var add = function (like) {
  _likes.push(like);
};

var remove = function (like) {
  var index = _likes.indexOf(like);

  _likes.splice(index, 1);
};

LikeStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case LikeConstants.LIKES_RECEIVED:
      reset(payload.likes);
      LikeStore.__emitChange();
      break;
    case LikeConstants.SINGLE_LIKE_RECEIVED:
      add(payload.like);
      LikeStore.__emitChange();
      break;
    case LikeConstants.LIKE_DESTROYED:
      remove(payload.like);
      LikeStore.__emitChange();
      break;
  }
};

LikeStore.includes = function (trackId) {
  return _likes.includes(parseInt(trackId));
};

module.exports = LikeStore;
