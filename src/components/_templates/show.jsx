var React = require('react/addons');

var EpisodeList = require('../episode-list');

module.exports = React.createClass({
  displayName: 'ShowLayout',

  mixins: [
    React.addons.PureRenderMixin,
    require('../../helpers/mixins/keys')
  ],

  render() {
    var k = this.getKeyHelper();

    var show = this.props.show || {};
    var eps = this.props.episodes || [];

    return (
      <article {...k('main')}>
        <h1 {...k('headline')}>
          {show.name }
        </h1>
        <p {...k('description')}>{show.description}</p>
        {eps.length > 0 &&
          <EpisodeList {...k('episodes')} episodes={eps} />
        }
      </article>
    );
  }
});
