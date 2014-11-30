var React = require('react');
var chCase = require('change-case');
var Router = require('react-router');

var {defaultKeyAndClass} = require('./_helpers');

if (process.env.BROWSER) {
  require('./_style/index.less');
  require('./_style/styleguide.less');
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
  require('./nav-main/demo'),
  require('./episode/demo')
];

var Styleguide = React.createClass({
  getDefaultProps() {
    return {cssName: this.displayName};
  },

  render() {
    var name = this.props.cssName;
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

window.renderToDOM = renderToDOM = function () {
  return React.render(
    <Styleguide/>,
    document.getElementById('container')
  );
}

renderToDOM();
