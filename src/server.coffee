require('coffee-script/register')

path = require('path')
express = require('express')
l = require('lodash')
gutil = require('gulp-util')
React = require('react')

App = require('./index.coffee')

STATIC_PATH = path.join(__dirname, '../build')
TEMPLATE_PATH = path.join(STATIC_PATH, 'template.html')

render = do ->
  template = require('fs').readFileSync(TEMPLATE_PATH)
  return l.template(template, null, variabled: 'data')

server = express()

server.use '/static', express.static(STATIC_PATH)

server.use (req, res, next) ->
  try
    page = App
      path: req.path
      setHTTPStatus: (code) -> res.status(code) if code?

    res.send render(data: html: React.renderComponentToString(page))
  catch error
    return next(error)

  statusCodeColor = if res.statusCode is 200 then 'green' else 'red'
  gutil.log(
    gutil.colors[statusCodeColor]("[#{res.statusCode}]"),
    "GET", req.path
  )

server.use (err, req, res, next) ->
  gutil.log(gutil.colors.red("[ERROR]"), req.path)
  next(err)

server.listen 3000, ->
  gutil.log("Server listening at http://localhost:3000/")
