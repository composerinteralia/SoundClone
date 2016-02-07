var React = require('react'),
    PlayerStore = require('../../stores/player'),
    PlayerActions = require('../../actions/player_actions');

module.exports = React.createClass({
  componentDidMount: function () {
    this._initWavesurfer();
    this.loaded = false;
  },

  componentWillUnmount: function () {
    setTimeout(function () {
      PlayerActions.unmountWavesurfer(this.props.track.id);
    }.bind(this), 0);
  },

  render: function () {
    var type = this.props.type;

    return <div className={ type + " wave-" + this.props.track.id }></div>;
  },

  _initWavesurfer: function () {
    var track = this.props.track,
        type = this.props.type,
        height = 128,
        visible = true

    if (type === "show-wave") {
      height = 200;
    }

    if (type === "hidden-wave") {
      visible = false;
    }

    var containerClass = "wave-" + track.id;
    var container = $("." + containerClass)[0];

    if (PlayerStore.wavesurferExists(track.id)) {
      setTimeout(function () {
        PlayerActions.remountWavesurfer(
          track.id,
          container,
          height,
          visible
      );
      }.bind(this), 0);
      return;
    }

    this.wavesurfer = Object.create(WaveSurfer);

    this.wavesurfer.init({
      container: container,
      height: height,
      visible: visible
    });

    this.wavesurfer.load(track.audio_url);

    setTimeout(function () {
      PlayerActions.receiveWavesurfer({
        track: track,
        wavesurfer: this.wavesurfer
      });

      this.wavesurfer.on('audioprocess', function () {
        PlayerActions.progress();
      })

      // 'finish' PlayerActions.next();

    }.bind(this), 0);
  }
});
