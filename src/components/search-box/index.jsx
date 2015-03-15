var React = require('react/addons');
var Kefir = require('kefir');
var {Navigation} = require('react-router');

var Bus = require('../../data');

if (process.env.BROWSER) { require('./style.less'); }

module.exports = React.createClass({
  displayName: 'SearchBox',

  mixins: [
    Navigation,
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
      this.transitionTo('search', null, {query: data});

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
      <form {...k()} action="GET" onSubmit={(ev) => ev.preventDefault()}>
        <label {...k('row')}>
          <span {...k('label')}>
            Search
          </span>
          <input {...k('input')} type="text"
            value={this.props.query} ref="queryInput" />
        </label>
      </form>
    );
  }
});
