var React = require('react');
var Router = require('react-router');

var {dispatch} = require('../data');

var Alert = require('../components/alert');

module.exports = React.createClass({
  displayName: 'VerifyPage',
  pageTitle: 'Verify',

  mixins: [
    Router.Navigation,
    Router.State,
    require('../helpers/mixins/events'),
    require('../helpers/mixins/keys')
  ],

  getInitialState() {
    return {loading: true};
  },

  componentWillMount() {
    var verifyToken = this.getQuery().token;
    if (!verifyToken) {
      return this.transitionTo('start');
    }
    dispatch({type: 'USER_VERIFY', data: {token: verifyToken}});
  },

  events: {
    USER_VERIFY_FAILURE(data) {
      this.setState({failure: data, loading: false});
    },
    USER_VERIFY_SUCCESS() {
      this.setState({success: true, loading: false});
    }
  },

  render() {
    var k = this.getKeyHelper();
    var s = this.state;
    console.log(s);

    return (
      <section {...k('main')}>
        <h1>Verification</h1>
        {s.loading &&
          <p {...k('loading')}>Loading...</p>
        }
        {s.failure &&
          <Alert {...k('failure')} type="failure"
            message={s.failure.data.message}/>
        }
        {s.success &&
          <div {...k('success')}>
            <p key="1">
              Your email address has been successfully verified.
            </p>
            <p key="2">

            </p>
          </div>
        }
      </section>
    );
  }
});
