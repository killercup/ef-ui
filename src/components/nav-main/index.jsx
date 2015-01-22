var React = require('react');

if (process.env.BROWSER) { require('./style.less'); }

var {Link} = require('react-router');

module.exports = React.createClass({
  displayName: 'NavMain',

  mixins: [
    require('../../helpers/mixins/keys')
  ],

  render() {
    var k = this.getKeyHelper({
      activeClassName: 'is-active'
    });

    return (
      <header className={this.props.cssName}>
        <nav {...k('nav')}>
          <Link to="start" {...k('link', {key: 'start'})}>
            Start
          </Link>
          <Link to="voting" {...k('link', {key: 'vote'})}>
            Vote
          </Link>
          <Link to="shows" {...k('link', {key: 'shows'})}>
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
