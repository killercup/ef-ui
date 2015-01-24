var React = require('react');
var ReactProps = require('react-prop-schema');

if (process.env.BROWSER) { require('./style.less'); }

var {Link} = require('react-router');
var Episode = require('../episode');
var Vote = require('../vote');

module.exports = React.createClass({
  displayName: 'EpisodeLine',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  propTypes: {
    vote: ReactProps.optional({
      rating: {type: 'number', min: 1, max: 3}
    }),
    episode: ReactProps.require({
      name: {type: 'string', pattern: 'lorem.sentence', rqeuired: true},
      season: {type: 'number', rqeuired: true},
      number: {type: 'number', rqeuired: true},
      description: {type: 'string', pattern: 'lorem.sentence'}
    }),
    show: ReactProps.require({
      name: {type: 'string', pattern: 'lorem.sentence', rqeuired: true}
    })
  },

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
