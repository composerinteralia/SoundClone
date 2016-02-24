var React = require('react'),
    History = require('react-router').History,
    LinkState = require('react-addons-linked-state-mixin'),
    UserUtil = require('../../util/user_util'),
    ModalActions = require('../../actions/modal_actions'),
    ModalSpinner = require('../modal_spinner'),
    FormErrorStore = require('../../stores/form_error'),
    FormErrors = require('../form_errors');

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
      imageUrl: "",
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
      image = (
        <div className="form-image">
          <img src={ this.state.imageUrl } />
        </div>
      );
    }

    return (
      <div className="modal" onClick={ this._cancel }>
        <div className="modal-container group" onClick={ this._stopPropogation }>
          <h2>Create Account</h2>

          <FormErrors messages={ this.state.errorMessages } />

          <form onSubmit={ this._submit } className="user-form group">
            <label className="image-upload-btn">
              { image }

              <div className="camera">
                <i className="fa fa-camera"> Image Upload</i>
              </div>

              <input className="hidden-file-upload" type="file" onChange={ this._imageUpload } />
            </label>

            <div className="form-fields">
              <label htmlFor="email">Email<span>*</span></label>
              <input
                id="email"
                type="text"
                valueLink={ this.linkState('email') } />

              <label htmlFor="password">Password <span>*</span></label>
              <input
                id="password"
                type="password"
                valueLink={ this.linkState('password') } />

              <label htmlFor="display_name">Display Name<span>*</span></label>
              <input
                id="display_name"
                type="text"
                valueLink={ this.linkState('display_name') } />

              <label htmlFor="fname">First Name</label>
              <input
                id="fname"
                type="text"
                valueLink={ this.linkState('fname') } />

              <label htmlFor="lname">Last Name</label>
              <input
                id="lname"
                type="text"
                valueLink={ this.linkState('lname') } />

            </div>

            <input
              type="submit"
              className="hidden-submit"
              tabIndex="-1" />
          </form>

          <button className="submit" onClick={ this._submit }>Sign Up</button>
          <button className="cancel" onClick={ this._cancel }>Cancel</button>
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
      this.setState({ imageFile: file, imageUrl: reader.result });
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageFile: null, imageUrl: "" });
    }
  },

  _submit: function (e) {
    e.preventDefault();

    this.setState({ submitted: true })

    var formData = new FormData();

    formData.append("user[email]", this.state.email);
    formData.append("user[password]", this.state.password);
    formData.append("user[display_name]", this.state.display_name);
    formData.append("user[fname]", this.state.fname);
    formData.append("user[lname]", this.state.lname);

    if (this.state.imageFile) {
      formData.append("user[profile_image]", this.state.imageFile);
    }


    var success = function () {
      this.history.pushState({}, "/");
    }.bind(this)

    var error = function () {
      this.setState({ submitted: false })
    }.bind(this)

    UserUtil.createUser(formData, success, error);
  },

  _onFormError: function () {
    this.setState({ errorMessages: FormErrorStore.all() })
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  }
});
