var React = require('react');
var Router = require('react-router');

var {dispatch} = require('../../data');

var FormField = require('../form-field');

function fieldOpts(name) {
  return {
    key: name.toLowerCase(),
    type: name.toLowerCase(),
    name: name.toLowerCase(),
    label: name,
  };
}

module.exports = React.createClass({
  displayName: 'LoginPage',
  pageTitle: 'Login',

  mixins: [
    Router.Navigation,
    require('../../helpers/mixins/events'),
    require('../../helpers/mixins/page_title'),
    require('../../helpers/mixins/keys')
  ],

  triggerLogin(event) {
    event.preventDefault();

    var form = this.refs.form.getDOMNode();

    var email = form.elements.email.value.trim();
    var password = form.elements.password.value.trim();

    if (!email || !password) { return; }

    dispatch({type: 'LOGIN', data: {email, password}});
  },

  events: {
    LOGIN_FAILURE(data) { this.setState({failure: data}); },
    LOGGED_IN() { this.transitionTo('start'); }
  },

  render() {
    var k = this.getKeyHelper();

    return (
      <section {...k('main')}>
        <h1 {...k('headline')}>
          Login
        </h1>
        {this.state.failure &&
          <p {...k('fail')}>{this.state.failure}</p>
        }
        <form {...k('form')} onSubmit={this.triggerLogin} ref="form">
          <FormField {...fieldOpts('EMail')} namespace="login" />
          <FormField {...fieldOpts('Password')} namespace="login" />
          <p key="submit">
            <button type="submit">
              Submit
            </button>
          </p>
        </form>
      </section>
    );
  }
});
