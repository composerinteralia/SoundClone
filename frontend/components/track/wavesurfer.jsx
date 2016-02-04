var React = require('react'),
    PlayerStore = require('../../stores/player'),
    PlayerActions = require('../../actions/player_actions');

module.exports = React.createClass({
  componentDidMount: function () {
    this._initWavesurfer();
  },

  componentWillUnmount: function () {
    setTimeout(function () {
      PlayerActions.removeWavesurfer(this.props.track.id);
    }.bind(this), 0);
  },

  render: function () {
    var type = this.props.type;

    return <div className={ type + " wave-" + this.props.track.id }></div>;
  },

  _initWavesurfer: function () {
    var track = this.props.track;

    var containerClass = "wave-" + track.id;
    var container = $("." + containerClass)[0];

    if (PlayerStore.wavesurferExists(containerClass)) {
      setTimeout(function () {
        PlayerActions.remountWavesurfer(container, "show-wave");
      }.bind(this), 0);
      return;
    }

    this.wavesurfer = Object.create(WaveSurfer);

    this.wavesurfer.init({
      container: container,
      waveColor: '#888',
      progressColor: '#f50',
      barWidth: 2,
      cursorWidth: 0
    });

    this.wavesurfer.load(track.audio_url);

    setTimeout(function () {
      PlayerActions.receiveWavesurfer({
        track: track,
        wavesurfer: this.wavesurfer
      });
    }.bind(this), 0);
  }
});
