var React = require('react'),
    History = require('react-router').History,
    LinkedState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions')
    CurrentUserStore = require('../../stores/current_user');

module.exports = React.createClass({
  mixins: [History, LinkedState],

  getInitialState: function () {
    return {
      title: "",
      description: "",
      imageFile: null,
      imageUrl: ""
    };
  },

  render: function () {
    var image;
    if (this.state.imageUrl) {
      image = <img src={this.state.imageUrl} />
    }

    return (
      <div className="modal" onClick={this._cancel}>
        <div className="modal-container" onClick={this._stopPropogation}>
          <h2>Create Track</h2>

            <form onSubmit={this._submit} className="track-update-form">
              <div className="form-image">
                {image}
              </div>
              <input type="file" onChange={this._imageUpload} />

              <label htmlFor="title">Title <span>*</span></label>
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
          <button onClick={this._submit}>Save Track</button>
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
      this.setState({imageFile: file, imageUrl: reader.result})
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file)
    } else {
      this.setState({imageFile: null, imageUrl: ""})
    }
  },

  _submit: function (e) {
    e.preventDefault();

    var formData = new FormData();

    formData.append("track[title]", this.state.title)
    formData.append("track[description]", this.state.description)
    formData.append("track[audio]", this.props.audio)
    if (this.state.imageFile) {
      formData.append("track[track_art]", this.state.imageFile)
    }

    ApiUtil.createTrack (formData, function () {
      this.history.pushState({}, "/users/" + CurrentUserStore.currentUser().id)
      // redirect to track show page
    }.bind(this));
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  }
});
