var React = require('react/addons');
var Kefir = require('kefir');

var Bus = require('../../data');

if (process.env.BROWSER) { require('./style.less'); }

module.exports = React.createClass({
  displayName: 'SearchBox',

  mixins: [
    React.addons.PureRenderMixin,
    require('../../helpers/mixins/keys')
  ],

  componentDidMount() {
    var inputField = this.refs.queryInput.getDOMNode();
    var queries = Kefir.fromEvent(inputField, 'keyup')
    .debounce(250)
    .map(ev => ev.target.value)
    .skipDuplicates()
    .map(data => {
      return {
        type: 'SEARCH_QUERY',
        data: {query: data, limit: this.props.limit}
      };
    });

    Bus.plug(queries);
  },

  render() {
    var k = this.getKeyHelper();

    return (
      <section {...k()}>
        <input {...k('input')} type="text" autofill="false" ref="queryInput" />
      </section>
    );
  }
});
