var React = require('react');

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
  displayName: 'RegisterPage',
  pageTitle: 'Register',

  mixins: [
    require('../../helpers/mixins/events'),
    require('../../helpers/mixins/page_title'),
    require('../../helpers/mixins/keys')
  ],

  triggerRegister() {
    event.preventDefault();

    var form = this.refs.form.getDOMNode();

    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var password = form.elements.password.value.trim();

    if (!name || !email || !password) { return; }

    dispatch({type: 'USER_CREATE', data: {name, email, password}});
  },

  events: {
    USER_CREATE_FAILURE(data) { this.setState({failure: data}); },
    USER_CREATED() { this.setState({showValidationInfo: true}); }
  },

  render() {
    var k = this.getKeyHelper();

    if (this.state.showValidationInfo) {
      return (
        <section {...k('main')}>
          <h1 {...k('headline')}>Thanks!</h1>
          <p key="1">
            A glorious and electronic mail has been sent to you, so it can be
            verified that you are in deed who you clain to be.
          </p>
          <p key="2">
            Just click the link in the email and all will be good.
          </p>
        </section>
      );
    } else {
      return (
        <section {...k('main')}>
          <h1 {...k('headline')}>Register</h1>
          <form {...k('form')} onSubmit={this.triggerRegister} ref="form">
            <FormField {...fieldOpts('Name')} namespace="register" />
            <FormField {...fieldOpts('EMail')} namespace="register" />
            <FormField {...fieldOpts('Password')} namespace="register" />
            <p key="submit">
              <button type="submit">Submit</button>
            </p>
          </form>
        </section>
      );
    }
  }
});
