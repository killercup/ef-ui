var React = require('react/addons');

if (process.env.BROWSER) { require('./style.less'); }

var Show = require('../show');

module.exports = React.createClass({
  displayName: 'Shows',

  mixins: [],

  propTypes: require('./props'),

  render() {
    var showList = this.props.shows.map((show) => {
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
