var React = require('react'),
    History = require('react-router').History,
    LinkState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions'),
    CurrentUserStore = require('../../stores/current_user');

module.exports = React.createClass({
  mixins: [LinkState],

  getInitialState: function () {
    var user = CurrentUserStore.currentUser();
    return {
      username: user.username,
      password: "",
      fname: user.fname,
      lname: user.lname,
      bio: user.bio,
      imageFile: null,
      imageUrl: user.profileImageUrl
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
          <h2>Edit your Profile</h2>

          <form onSubmit={this._submit} className="user-form">
            <div>
              {image}
              <input type="file" onChange={this._imageUpload} />
            </div>

            <label htmlFor="username">Username <span>*</span></label>
            <input
              id="username"
              type="text"
              valueLink={this.linkState('username')} />

            <label htmlFor="password">Password <span>*</span></label>
            <input
              id="password"
              type="password"
              valueLink={this.linkState('password')} />

            <label htmlFor="fname">First Name</label>
            <input
              id="fname"
              type="text"
              valueLink={this.linkState('fname')} />

            <label htmlFor="lname">Last Name</label>
            <input
              id="lname"
              type="text"
              valueLink={this.linkState('lname')} />

            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              type="text"
              valueLink={this.linkState('bio')} />

            <input
              type="submit"
              className="hidden-submit"
              tabIndex="-1" />

          </form>

          <button className="cancel" onClick={this._cancel}>Cancel</button>
          <button onClick={this._submit}>Save Changes</button>
        </div>
      </div>
    );
  },

  _cancel: function () {
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

    formData.append("user[username]", this.state.username)
    formData.append("user[fname]", this.state.fname)
    formData.append("user[lname]", this.state.lname)
    formData.append("user[bio]", this.state.bio)

    if (this.state.password) {
      formData.append("user[password]", this.state.password)
    }

    if (this.state.imageFile) {
      formData.append("user[profile_image]", this.state.imageFile)
    }

    ApiUtil.updateUser(formData);
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  }
});
