var React = require('react'),
    History = require('react-router').History,
    LinkState = require('react-addons-linked-state-mixin'),
    ApiUtil = require('../../util/api_util'),
    ModalActions = require('../../actions/modal_actions');

module.exports = React.createClass({
  mixins: [History, LinkState],

  getInitialState: function () {
    return {
      email: "",
      password: "",
      display_name: "",
      fname: "",
      lname: "",
      imageFile: null,
      imageUrl: ""
    };
  },

  render: function () {
    var image;

    if (this.state.image_url) {
      image = (<img src={this.state.image_url} />);
    }

    return (
      <div className="modal" onClick={this._cancel}>
        <div className="modal-container" onClick={this._stopPropogation}>
          <h2>Create Account</h2>

          <form onSubmit={this._submit} className="user-form">
            <div className="form-image">
              {image}
            </div>
            <input type="file" onChange={this._imageUpload} />

            <label htmlFor="email">Email<span>*</span></label>
            <input
              id="email"
              type="text"
              valueLink={this.linkState('email')} />

            <label htmlFor="password">Password <span>*</span></label>
            <input
              id="password"
              type="password"
              valueLink={this.linkState('password')} />

            <label htmlFor="display_name">Display Name<span>*</span></label>
            <input
              id="display_name"
              type="text"
              valueLink={this.linkState('display_name')} />

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

            <input
              type="submit"
              className="hidden-submit"
              tabIndex="-1" />

          </form>

          <button className="cancel" onClick={this._cancel}>Cancel</button>
          <button onClick={this._submit}>Sign Up</button>
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

    formData.append("user[email]", this.state.email);
    formData.append("user[password]", this.state.password);
    formData.append("user[display_name]", this.state.display_name);
    formData.append("user[fname]", this.state.fname);
    formData.append("user[lname]", this.state.lname);

    if (this.state.imageFile) {
      formData.append("user[profile_image]", this.state.imageFile);
    }

    ApiUtil.createUser(formData, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  }
});
