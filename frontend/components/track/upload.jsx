var React = require('react'),
    ModalStore = require('../../stores/modal'),
    ModalActions = require('../../actions/modal_actions'),
    NewTrackForm = require('./new_form');

module.exports = React.createClass({
  getInitialState: function () {
    return {audioFile: null, modal: null };
  },

  componentDidMount: function () {
    this.onModalToken = ModalStore.addListener(this._onModal);
  },

  componentWillUnmount: function () {
    this.onModalToken.remove();
  },

  render: function () {
    return(
      <div className="main content">
        {this.state.modal}

        <section className="audio-upload">

          <h2>Upload to SoundClone</h2>

          <label className="file-upload-btn audio-upload-btn">
            Choose a file to upload
            <input className="hidden-file-upload" type="file" onChange={this._audioUpload} />
          </label>

        </section>

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
