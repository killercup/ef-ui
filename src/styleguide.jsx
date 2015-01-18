var React = require('react');
var chCase = require('change-case');
var Router = require('react-router');

var {defaultKeyAndClass} = require('./helpers');

if (process.env.BROWSER) {
  require('./style/index.less');
  require('./style/styleguide.less');
}

if ((process.env.NODE_ENV !== 'production') && window) {
  // Enable dev tools
  window.React = React;
}

// Monkey-patch the Link component to make it do... nothing. This is required
// because react-router will whine about missing routes.
Router.Link = React.createClass({
  displayName: 'FakeLink',
  render() {
    return (
      <a {...this.props} href={'#' + this.props.to}>
        {this.props.children}
      </a>
    );
  }
});

// - - -

var components = [
  require('./components/nav-main/demo'),
  require('./components/episode/demo')
];

var Styleguide = React.createClass({
  getDefaultProps() {
    return {cssName: this.displayName};
  },

  render() {
    var k = defaultKeyAndClass(this.props.cssName);

    var componentList = components.map(function (c) {
      var demos = c.demos.map(function (d, index) {
        return (
          <article {...k('item-demo', {key: index})}>
            {d}
          </article>
        );
      });

      return (
        <section {...k('item', {key: chCase.paramCase(c.name)})}>
          <h2 {...k('item-header')}>
            {chCase.titleCase(c.name)}
          </h2>
          {demos}
        </section>
      );
    });

    return (
      <div key={0}>
        <h1 {...k('header')}>
          Styleguide
        </h1>
        {componentList}
      </div>
    );
  }
});

function renderToDOM() {
  return React.render(
    <Styleguide/>,
    document.getElementById('container')
  );
}

window.renderToDOM = renderToDOM;

renderToDOM();
