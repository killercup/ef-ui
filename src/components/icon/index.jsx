/**
 * # Icon Component
 *
 * A helper component to include icons in other components. The icon themselves
 * are described/inserted as background images. By default, they should be SVG
 * files small enough for Webpack to inline them as data URIs.
 *
 * ## Usage in Other Components
 *
 * 1. Require this component: `var Icon = require(../icon);`
 * 2. Require the less files describing the icons you want to use, e.g.
 *     `require('../icon/user.less');`.
 * 3. Use it like this: `<Icon name="user"/>`.
 */

var React = require('react/addons');
var ReactProps = require('react-prop-schema');

if (process.env.BROWSER) {
  // This file starts with an underscore so you can easily distinguish it from
  // the `.less` files containing icon desriptions.
  require('./_style.less');
}

module.exports = React.createClass({
  displayName: 'Icon',

  mixins: [
    React.addons.PureRenderMixin,
    require('../../helpers/mixins/keys')
  ],

  propTypes: {
    name: ReactProps.require({type: 'string', pattern: 'lorem.word'}),
    title: ReactProps.optional({type: 'string', pattern: 'lorem.word'}),
    size: ReactProps.optional({type: 'number', min: 1}),
    width: ReactProps.optional({type: 'number', min: 1}),
    height: ReactProps.optional({type: 'number', min: 1})
  },

  render() {
    var p = this.props;
    var cx = ["Icon", "Icon-" + p.name];
    var style = {
      width: p.width || p.size,
      height: p.height || p.size
    };

    return (
      <i className={cx.join(' ')} style={style} title={p.title} />
    );
  }
});
