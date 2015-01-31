if (process.env.NODE_ENV !== 'production') {
  var ReactProps = require('react-prop-schema');

  module.exports = {
    name: ReactProps.require({type: 'string', pattern: 'company.companyName'}),
    wallpaper: ReactProps.require({type: 'string'}),
    updated_at: ReactProps.require({type: 'string'}),
    is_running: ReactProps.require({type: 'boolean'})
  };
}
