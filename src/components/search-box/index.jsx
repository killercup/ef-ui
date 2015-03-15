var React = require('react/addons');
var Kefir = require('kefir');
var {Navigation} = require('react-router');

var Bus = require('../../data');

if (process.env.BROWSER) { require('./style.less'); }

function preventDefault(ev) { ev.preventDefault(); }

module.exports = React.createClass({
  displayName: 'SearchBox',

  mixins: [
    Navigation,
    require('../../helpers/mixins/keys')
  ],

  propTypes: require('./props'),

  componentDidMount() {
    var inputField = this.refs.queryInput.getDOMNode();

    var queries = Kefir.fromEvent(inputField, 'keyup')
    .debounce(250)
    .map(ev => ev.target.value)
    .filter(val => val.length > 0)
    .skipDuplicates()
    .map(data => {
      this.transitionTo('search', null, {query: data});

      return {
        type: 'TRIGGER_SEARCH_QUERY',
        data: {query: data, limit: this.props.limit}
      };
    });

    Bus.plug(queries);
  },

  componentDidUpdate(prevProps) {
    // Update the input field after URL change
    if (this.props.query !== prevProps.query) {
      var inputField = this.refs.queryInput.getDOMNode();
      inputField.value = this.props.query || "";
    }
  },

  render() {
    var k = this.getKeyHelper();

    return (
      <form {...k('', {className: this.props.className})}
        action="GET" onSubmit={preventDefault}>
        <label {...k('row')}>
          <span {...k('label')}>
            Search
          </span>
          <input {...k('input')} type="search" placeholder="Search..."
            defaultValue={this.props.query || ""} ref="queryInput" />
        </label>
      </form>
    );
  }
});
