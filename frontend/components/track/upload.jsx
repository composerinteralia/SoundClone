var React = require('react'),
    ModalStore = require('../../stores/modal'),
    ModalActions = require('../../actions/modal_actions'),
    NewTrackForm = require('./new_form');

module.exports = React.createClass({
  getInitialState: function () {
    return {audioFile: null, modal: null};
  },

  componentDidMount: function () {
    this.onModalToken = ModalStore.addListener(this._onModal);
  },

  componentWillUnmount: function () {
    this.onModalToken.remove();
  },

  render: function () {
    return(
      <div className="main">
        {this.state.modal}
        <label htmlFor="audio">Upload Audio</label>
        <input id="audio" type="file" onChange={this._audioUpload} />
      </div>
    );
  },

  _audioUpload: function (e) {
    e.preventDefault();

    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    if (file) {
      var modal = <NewTrackForm audio={file} />;
      ModalActions.receiveModal(modal);
    } else {
      this.setState({audioFile: null});
    }
  },

  _onModal: function () {
    var modal = ModalStore.get();
    this.setState({ modal: modal });
  }
});
