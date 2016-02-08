var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="modal" >
        <div className="modal-container" >
          <div className="loader">Please wait...</div>
        </div>
      </div>
    )
  }
});
