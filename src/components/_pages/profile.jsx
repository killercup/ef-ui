var React = require('react');
var Router = require('react-router');

var Auth = require('../../data/auth');

var Template = require('../_templates/profile');

module.exports = React.createClass({
  displayName: 'ProfilePage',
  pageTitle: "Profile",

  mixins: [
    Router.Navigation,
    require('../../helpers/mixins/page_title'),
    require('../../helpers/mixins/events')
  ],

  componentWillMount() {
    if (!Auth.exists()) {
      this.transitionTo('login');
    }
  },

  getInitialState() {
    return {user: Auth.get()};
  },

  events: {
    USER_UPDATE_FAILURE(data) { this.setState({failure: data}); },
    USER_UPDATE_NOTICE(data) { this.setState({notice: data}); },
    USER_UPDATED() {
      var data = this.getInitialState();
      data.notice = {success: true};
      this.setState(data);
    }
  },

  render() {
    return (
      <Template user={this.state.user}
        failure={this.state.failure} notice={this.state.notice} />
    );
  }
});
