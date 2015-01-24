var React = require('react');
var {RouteHandler} = require('react-router');
var NavMain = require('../nav-main');

var BaseTemplate = React.createClass({
  render() {
    return (
      <div className="page">
        <NavMain key="nav-main"/>
        <RouteHandler key="content" appState={this.props.data} />
      </div>
    );
  }
});

module.exports = BaseTemplate;
