var React = require('react');
var {Link} = require('react-router');
var ReactProps = require('react-prop-schema');

if (process.env.BROWSER) { require('./style.less'); }

module.exports = React.createClass({
  displayName: 'Show',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  propTypes: {
    name: ReactProps.require({type: 'string', pattern: 'company.companyName'}),
    wallpaper: ReactProps.require({type: 'string'}),
    is_running: ReactProps.require({type: 'boolean'})
  },

  render() {
    var k = this.getKeyHelper();
    var d = this.props;

    return (
      <article className="Show">
        <div {...k('bg')} style={{
          backgroundImage: 'url(http://thetvdb.com/banners/' + d.wallpaper + ')'
        }}/>
        <h1 {...k('name')}>
          <Link to="show" params={{id: d.id}}>
            {d.name}
          </Link>
        </h1>
      </article>
    );
  }
});
