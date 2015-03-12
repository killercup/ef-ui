var React = require('react/addons');
var {Link} = require('react-router');

if (process.env.BROWSER) { require('./style.less'); }

module.exports = React.createClass({
  displayName: 'Show',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  propTypes: require('./props'),

  shouldComponentUpdate(nextProps) {
    return this.props.updated_at !== nextProps.updated_at;
  },

  render() {
    var k = this.getKeyHelper();
    var d = this.props;

    return (
      <article className="Show">
        <Link {...k('bg')} to="show" params={{id: d.id}} style={{
          backgroundImage: 'url(http://thetvdb.com/banners/' + d.wallpaper + ')'
        }}>
          <h1 {...k('name')}>
            {d.name}
          </h1>
        </Link>
      </article>
    );
  }
});
