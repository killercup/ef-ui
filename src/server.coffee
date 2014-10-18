require('coffee-script/register')

path = require('path')
express = require('express')
l = require('lodash')
React = require('react')

App = require('./index.coffee')

STATIC_PATH = path.join(__dirname, '../build')
TEMPLATE_PATH = path.join(STATIC_PATH, 'template.html')

render = do ->
  template = require('fs').readFileSync(TEMPLATE_PATH)
  return l.template(template, null, variabled: 'data')

server = express()

server.use('/static', express.static(STATIC_PATH))

server.use (req, res, next) ->
  try
    page = App
      path: req.path
      setHTTPStatus: (code) -> res.status(code) if code?

    res.send render(data: html: React.renderComponentToString(page))
  catch error
    next(error)

server.listen 3000, ->
  console.log("Server listening at http://localhost:3000/")
