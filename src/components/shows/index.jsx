var React = require('react/addons');
var l = require('lodash');

if (process.env.BROWSER) { require('./style.less'); }

var Show = require('../show');

module.exports = React.createClass({
  displayName: 'Shows',

  mixins: [],

  propTypes: require('./props'),

  render() {
    var shows = l.sortBy(this.props.shows, 'name');
    var showList = shows.map((show) => {
      return (
        <Show key={show.id} {...show} />
      );
    });

    return (
      <section className="Shows">
        {showList}
      </section>
    );
  }
});
