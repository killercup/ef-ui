var React = require('react');
var {RouteHandler} = require('react-router');
var NavMain = require('../components/nav-main');

var BaseTemplate = React.createClass({
  displayName: 'PageBaseTemplate',

  render() {
    return (
      <div className="page">
        <NavMain key="nav-main"/>
        <div key="page-content" className="page-content">
          <RouteHandler key="content" appState={this.props.data} />
        </div>
      </div>
    );
  }
});

module.exports = BaseTemplate;
