TrackUtil = require('../util/track_util');

module.exports = {
  _likeTrack: function (trackId) {
    TrackUtil.createLike(trackId);
  },

  _unlikeTrack: function (trackId) {
    TrackUtil.destroyLike(trackId);
  }
};
