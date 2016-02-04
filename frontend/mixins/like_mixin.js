TrackUtil = require('../util/track_util');

module.exports = {
  _likeTrack: function (trackId, e) {
    e.preventDefault();
    TrackUtil.createLike(trackId);
  },

  _unlikeTrack: function (trackId, e) {
    e.preventDefault();
    TrackUtil.destroyLike(trackId);
  }
};
