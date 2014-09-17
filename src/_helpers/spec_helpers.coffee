React = require('React')

exports.dom = (markup='<html><body></body></html>', options={}) ->
  return if document?
  jsdom = require("jsdom").jsdom
  global.document = jsdom(markup, options)
  global.window = global.document.parentWindow

exports.resetDom = (done) ->
  # cf. http://www.asbjornenge.com/wwc/testing_react_components.html
  React.unmountComponentAtNode(document.body)
  document.body.innerHTML = ""
  setTimeout(done)
