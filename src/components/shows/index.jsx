var React = require('react');
var ReactProps = require('react-prop-schema');

if (process.env.BROWSER) { require('./style.less'); }

var Show = require('../show');

module.exports = React.createClass({
  displayName: 'Shows',

  propTypes: {
    shows: ReactProps.require({
      type: 'array', schema: {
        id: {type: 'number', required: true}
      }
    }),
  },

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
