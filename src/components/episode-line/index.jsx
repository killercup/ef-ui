var React = require('react/addons');

if (process.env.BROWSER) { require('./style.less'); }

var {Link} = require('react-router');
var Episode = require('../episode');
var Vote = require('../vote');

module.exports = React.createClass({
  displayName: 'EpisodeLine',

  mixins: [
    React.addons.PureRenderMixin,
    require('../../helpers/mixins/keys')
  ],

  propTypes: require('./props'),

  render() {
    var k = this.getKeyHelper();
    var p = this.props;

    return (
      <section {...k(false, {className: p.className})}>
        <header {...k('header')}>
          <h2 {...k('name')}>
            <Link key="link" to="episode" params={{id: p.episode.id}}>
              <Episode {...p.episode}/>
            </Link>
          </h2>
          <div {...k('vote')}>
            <Vote vote={p.vote} episodeId={p.episode.id} showId={p.show.id} />
          </div>
        </header>
        <p {...k('description')} style={{display: 'none'}}>
          {(p.episode.description || "").slice(0, 80)}
        </p>
      </section>
    );
  }
});
