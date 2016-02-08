var React = require('react'),
    LinkedState = require('react-addons-linked-state-mixin'),
    TrackUtil = require('../../util/track_util'),
    ModalActions = require('../../actions/modal_actions'),
    TrackStore = require('../../stores/track'),
    ModalSpinner = require('../modal_spinner'),
    FormErrorStore = require('../../stores/form_error'),
    FormErrors = require('../form_errors');

module.exports = React.createClass({
  mixins: [LinkedState],

  getInitialState: function () {
    var title = "", description = "", imageUrl = "";
    var track = this.props.track;

    if (track) {
      title = track.title;
      description = track.description;
      imageUrl = track.image_url;
    }

    return {
      title: title,
      description: description,
      imageFile: null,
      imageUrl: imageUrl,
      submitted: false,
      errorMessages: []
    };
  },

  componentDidMount: function () {
    this.formErrorChange = FormErrorStore.addListener(this._onFormError);
  },

  componentWillUnmount: function () {
    this.formErrorChange.remove();
  },

  render: function () {
    if (this.state.submitted) {
      return <ModalSpinner/>;
    }

    var image;
    if (this.state.imageUrl) {
      image = (<img src={this.state.imageUrl} />);
    }

    return (
      <div className="modal" onClick={this._cancel}>
        <div className="modal-container group" onClick={this._stopPropogation}>
          <h2>Edit Track</h2>

          <FormErrors messages={ this.state.errorMessages } />

          <form onSubmit={this._submit} className="track-update-form">
            <div className="form-image">
              {image}
            </div>
            <input type="file" onChange={this._imageUpload} />

            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              valueLink={this.linkState('title')}>
            </input>

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              valueLink={this.linkState('description')}>
            </textarea>

            <input
              type="submit"
              className="hidden-submit"
              tabIndex="-1" >
            </input>
          </form>

          <button className="submit" onClick={this._submit}>Save Changes</button>
          <button className="cancel" onClick={this._cancel}>Cancel</button>
        </div>
      </div>
    );
  },

  _cancel: function (e) {
    ModalActions.destroyModal();
  },

  _imageUpload: function (e) {
    e.preventDefault();

    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({imageFile: file, imageUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({imageFile: null, imageUrl: ""});
    }
  },

  _submit: function (e) {
    e.preventDefault();

    this.setState({ submitted: true })

    var formData = new FormData();

    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);
    if (this.state.imageFile) {
      formData.append("track[track_art]", this.state.imageFile);
    }

    var error = function () {
      this.setState({ submitted: false })
    }.bind(this)

    TrackUtil.updateTrack (this.props.track.id, formData, error);
  },

  _onFormError: function () {
    this.setState({ errorMessages: FormErrorStore.all() })
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  }
});
