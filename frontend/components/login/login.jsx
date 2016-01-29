var React = require('react'),
    ModalStore = require('../../stores/modal'),
    ModalActions = require('../../actions/modal_actions'),
    SessionForm = require('./session_form');

module.exports = React.createClass({
  render: function () {
    return (
      <main className="login main">
        <header className="login-header">
          <div className="group">
            <figure className="login-sheep"></figure>
            <span className="soundclone">SOUNDCLONE</span>

            <div className="login-buttons">
              <button className="guest">Guest</button>
              <button className="sign-in">Sign In</button>
              <button className="create">Create Account</button>
            </div>
          </div>


        </header>

        <SessionForm />
      </main>
    );
  }
});
