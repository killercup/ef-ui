var React = require('react');
var Router = require('react-router');
var NavMain = require('../nav-main');

var BaseTemplate = React.createClass({
  render() {
    return (
      <div className="page">
        <NavMain key="nav-main"/>
        <Router.RouteHandler key="content" appState={this.props.data} />
      </div>
    );
  }
});

module.exports = BaseTemplate;
