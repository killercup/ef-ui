var React = require('react');

module.exports = React.createClass({
  displayName: 'LogoutPage',
  pageTitle: 'Logout',

  mixins: [
    require('../../helpers/mixins/page_title'),
    require('../../helpers/mixins/keys')
  ],

  render() {
    var k = this.getKeyHelper();

    return (
      <section {...k('main')}>
        <h1 {...k('headline')}>Bye!</h1>
      </section>
    );
  }
});
