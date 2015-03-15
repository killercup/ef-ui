var React = require('react');
var Router = require('react-router');

var {dispatch} = require('../../data');

var FormField = require('../form-field');

function fieldOpts(name) {
  return {
    key: name.toLowerCase(),
    type: name.toLowerCase(),
    name: name.toLowerCase(),
    label: name
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
    var s = this.state;

    var failure = s.failure && (
      <div {...k('failure', {className: 'failure'})}>
        <h3 {...k('failure-headline')}>
          There was a problem.
        </h3>
        {s.failure.data && s.failure.data.message &&
          <p {...k('failure-message')}>
            {s.failure.data.message}
          </p>
        }
      </div>
    );

    return (
      <section {...k('main')}>
        <h1 {...k('headline')}>
          Login
        </h1>
        {failure}
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
