require('coffee-script/register')
require('node-jsx').install({extension: '.jsx', harmony: true})

path = require('path')
express = require('express')
l = require('lodash')
gutil = require('gulp-util')
React = require('react')
Router = require('react-router')

appRoutes = require('./routes.jsx')

STATIC_PATH = path.join(__dirname, '../build')
TEMPLATE_PATH = path.join(STATIC_PATH, 'template.html')

render = do ->
  template = require('fs').readFileSync(TEMPLATE_PATH)
  return l.template(template, null, variabled: 'data')

server = express()

server.use '/static', express.static(STATIC_PATH)

server.use (req, res, next) ->
  setHTTPStatus = (code) -> res.status(code) if code?

  try
    page = Router.run appRoutes, req.path, (Handler) ->
      page = Handler({setHTTPStatus: setHTTPStatus})
      res.send render {data: {html: React.renderToString(page)}}
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

port = process.env.NODE_PORT or 3000

server.listen port, ->
  gutil.log("Server listening at http://localhost:#{port}/")
