var React = require('react'),
    LinkedState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions'),
    TrackStore = require('../../stores/track');

module.exports = React.createClass({
  mixins: [LinkedState],

  getInitialState: function () {
    var title = "", description = "", imageUrl = "";
    var track = TrackStore.find(this.props.trackId);

    if (track) {
      title = track.title;
      description = track.description;
      imageUrl = track.image_url;
    }

    return {
      title: title,
      description: description,
      imageFile: null,
      imageUrl: imageUrl
    };
  },

  componentDidMount: function () {
    this.onChangeToken = TrackStore.addListener(this._onChange);
    // ApiUtil.fetchSingleTrack(this.props.trackId);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
  },

  render: function () {
    var image;
    if (this.state.imageUrl) {
      image = (<img src={this.state.imageUrl} />);
    }

    return (
      <div className="modal" onClick={this._cancel}>
        <div className="modal-container" onClick={this._stopPropogation}>
          <h2>Edit Track</h2>

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

          <button className="cancel" onClick={this._cancel}>Cancel</button>
          <button onClick={this._submit}>Save Changes</button>
        </div>
      </div>
    );
  },

  _cancel: function (e) {
    ModalActions.destroyModal();
  },

  _onChange: function () {
    var title = "", description = "";
    var track = TrackStore.find(this.props.trackId);

    if (track) {
      title = track.title;
      description = track.description;
      imageUrl = track.image_url;
    }

    this.setState({
      title: title,
      description: description,
      imageFile: null,
      imageUrl: imageUrl
    });
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

    var formData = new FormData();

    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);
    if (this.state.imageFile) {
      formData.append("track[track_art]", this.state.imageFile);
    }

    ApiUtil.updateTrack (this.props.trackId, formData);
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  }
});
