var React = require('react');
var {Link} = require('react-router');
var firstBy = require('then-by');

var Episode = require('../episode');

module.exports = React.createClass({
  displayName: 'EpisodeList',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  render() {
    var k = this.getKeyHelper();

    var eps = this.props.episodes
      .sort(firstBy('season').thenBy('number'))
      .map(ep => {
        return (
          <Link key={ep.id} to="episode" params={{id: ep.id}}>
            <Episode {...ep}/>
          </Link>
        );
      });

    return (
      <section className={this.props.className || k().className}>
        {eps}
      </section>
    );
  }
});
