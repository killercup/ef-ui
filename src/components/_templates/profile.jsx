var React = require('react/addons');
var ReactProps = require('react-prop-schema');

var Auth = require('../../data/auth');

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
  displayName: "ProfileLayout",

  mixins: [
    React.addons.PureRenderMixin,
    require('../../helpers/mixins/keys')
  ],

  propTypes: {
    user: ReactProps.require({type: 'object', schema: {
      id: {type: 'number', required: true, min: 1},
      name: {type: 'string', required: true, pattern: 'lorem.words'},
      email: {type: 'string', required: true, pattern: 'internet.email'}
    }}),
    failure: ReactProps.optional({type: 'object'}),
    notice: ReactProps.optional({type: 'object'})
  },

  save() {
    event.preventDefault();

    var form = this.refs.form.getDOMNode();

    var id = Auth.get('id');
    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var password = form.elements.password.value.trim();

    dispatch({type: 'USER_UPDATE', data: {id, name, email, password}});
  },

  render() {
    var k = this.getKeyHelper();
    var p = this.props;

    var successNotice = (p.notice && p.notice.success === true) && (
      <div {...k('success', {className: 'notice'})}>
        Succuessfully saved.
      </div>
    );
    var verificationNotice = (p.notice && p.notice.verified === false) && (
      <div {...k('unverified', {className: 'notice'})}>
        Your account is not verified. We sent you an email containing a unqiue
        verification link. Please click on that.
      </div>
    );

    return (
      <section {...k()}>
        <h1 {...k('headline')}>
          Update Profile
        </h1>
        {p.failure &&
          <div {...k('failure')}>{p.failure}</div>
        }
        {successNotice}
        {verificationNotice}
        <form {...k('form')} onSubmit={this.save} ref="form">
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
});
