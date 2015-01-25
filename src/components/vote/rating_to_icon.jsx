var React = require('react/addons');

if (process.env.BROWSER) {
  require('../icon/stars.less');
}

var ratingToText = require('../../helpers/rating_to_text');
var Icon = require('../icon');

var RATING_ICONS = {
  1: 'star-empty',
  2: 'star-half',
  3: 'star-full'
};

module.exports = function ratingToIcon(rating) {
  return (
    <Icon name={RATING_ICONS[rating]} size={18} title={ratingToText(rating)} />
  );
};
