var React = require('react');
var ReactProps = require('react-prop-schema');

if (process.env.BROWSER) { require('./style.less'); }

var {Link} = require('react-router');
var Episode = require('../episode');

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

    return (
      <section {...k('line', {className: this.props.className})}>
        <header {...k('header')}>
          <h2 {...k('name')}>
            <Link key="link" to="episode" params={{id: this.props.episode.id}}>
              <Episode {...this.props.episode}/>
            </Link>
          </h2>
          <div {...k('vote')}>
            {this.props.vote && this.props.vote.rating}
          </div>
        </header>
        <p {...k('description')} style={{display: 'none'}}>
          {(this.props.episode.description || "").slice(0, 80)}
        </p>
      </section>
    );
  }
});
