var React = require('react');
var Router = require('react-router');
var {defaultKeyAndClass} = require('../helpers');

var {getEvents, dispatch} = require('../data');

module.exports = React.createClass({
  displayName: 'LoginPage',
  pageTitle: 'Login',
  mixins: [Router.Navigation],

  getDefaultProps() {
    return {cssName: this.displayName};
  },

  getInitialState() {
    return {};
  },

  triggerLogin(event) {
    event.preventDefault();

    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    if (!email || !password) { return; }

    dispatch({type: 'LOGIN', data: {email, password}});
  },

  componentDidMount() {
    console.log('hi, login!');
    getEvents('LOGIN_FAILURE').onValue(data => this.setState({failure: data}));
    getEvents('LOGGED_IN').onValue(() => this.transitionTo('start'));
  },

  render() {
    var k = defaultKeyAndClass(this.props.cssName);

    return (
      <section {...k('main')}>
        <h1 {...k('headline')}>
          Login
        </h1>
        {this.state.failure &&
          <p {...k('fail')}>{this.state.failure}</p>
        }
        <form {...k('form')} onSubmit={this.triggerLogin}>
          <p key="email">
            <input name="email" type="email" ref="email"/>
          </p>
          <p key="password">
            <input name="password" type="password" ref="password"/>
          </p>
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
