var React = require('react'),
    History = require('react-router').History,
    LinkState = require('react-addons-linked-state-mixin'),
    UserUtil = require('../../util/user_util'),
    ModalActions = require('../../actions/modal_actions'),
    CurrentUserStore = require('../../stores/current_user'),
    ModalSpinner = require('../modal_spinner'),
    FormErrorStore = require('../../stores/form_error'),
    FormErrors = require('../form_errors');

module.exports = React.createClass({
  mixins: [LinkState],

  getInitialState: function () {
    var user = CurrentUserStore.currentUser();
    return {
      fname: user.fname || "",
      lname: user.lname || "",
      display_name: user.display_name,
      imageFile: null,
      imageUrl: user.profile_image_url,
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
          <h2>Edit your Profile</h2>

          <FormErrors messages={ this.state.errorMessages } />

          <form onSubmit={this._submit} className="user-form">
            <div className="form-image">
              {image}
            </div>
            <input type="file" onChange={this._imageUpload} />

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

          <button className="submit" onClick={this._submit}>Save Changes</button>
          <button className="cancel" onClick={this._cancel}>Cancel</button>
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

    this.setState({ submitted: true })

    var formData = new FormData();

    formData.append("user[display_name]", this.state.display_name);
    formData.append("user[fname]", this.state.fname);
    formData.append("user[lname]", this.state.lname);

    if (this.state.imageFile) {
      formData.append("user[profile_image]", this.state.imageFile);
    }

    var error = function () {
      this.setState({ submitted: false })
    }.bind(this)

    UserUtil.updateUser(formData, error);
  },

  _onFormError: function () {
    this.setState({ errorMessages: FormErrorStore.all() })
  },

  _stopPropogation: function (e) {
    e.stopPropagation();
  }
});
