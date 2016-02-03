var React = require('react'),
    TrackStore = require('../../stores/track'),
    ApiUtil = require('../../util/api_util');

module.exports = React.createClass({
  getInitialState: function () {
    var track = TrackStore.find(this.props.params.id);
    return { track: track };
  },

  componentDidMount: function () {
    this.onChangeToken = TrackStore.addListener(this._onChange);

    ApiUtil.fetchSingleTrack(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.onChangeToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchUser(newProps.params.id);
  },

  render: function () {
    var track = this.state.track;

    if (typeof track === "undefined") {
      return <div>User not found!</div>;
    }

    return (
      <main className="main">
        <header className="profile-header group">
          <figure className="profile-image">
            <img src={track.image_url}/>
          </figure>

          <div className="profile-names">
            <div className="display-name group">
              <h1>{track.title}</h1>
            </div>
          </div>

        </header>

        <section className="content">

        </section>
      </main>
    );
  },

  _onChange: function () {
    var track = TrackStore.find(this.props.params.id);
    this.setState({ track: track });
  }
});
