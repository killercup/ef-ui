var React = require('react');
var {defaultKeyAndClass} = require('../_helpers');

if (process.env.BROWSER) { require('./style.less'); }

var {Link} = require('react-router');

module.exports = React.createClass({
  displayName: 'NavMain',

  getDefaultProps() {
    return {cssName: this.displayName};
  },

  render() {
    var k = defaultKeyAndClass(this.props.cssName, {
      activeClassName: 'is-active'
    });

    return (
      <header className={this.props.cssName}>
        <nav {...k('nav')}>
          <Link {...k('link', {key: 'start', to: "start"})}>
            Start
          </Link>
          <Link {...k('link', {key: 'shows', to: "shows"})}>
            Shows
          </Link>
          {(process.env.NODE_ENV !== 'production') &&
            <a {...k('link', {
              key: 'styleguide',
              href: "/styleguide.html",
              className: 'is-right'
            })}>
              Styleguide
            </a>
          }
          {/*
            Add placeholder div with `flex: 1` to enable items on the right by
            using `order: 10`
          */}
          <div {...k('placeholder')} />
        </nav>
      </header>
    );
  }
});
