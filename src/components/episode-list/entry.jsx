var React = require('react');
var {Link} = require('react-router');

var Episode = require('../episode');

module.exports = React.createClass({
  displayName: 'EpisodeListEntry',

  shouldComponentUpdate(nextProps) {
    return this.props.updated_at !== nextProps.updated_at;
  },

  render() {
    var ep = this.props;

    return (
      <Link key={ep.id} to="episode" params={{id: ep.id}}>
        <Episode {...ep}/>
      </Link>
    );
  }
});
