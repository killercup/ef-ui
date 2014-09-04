# # Frontend Build Process

gulp = require('gulp')
gutil = require('gulp-util')
plumber = require('gulp-plumber')

webpack = require("webpack")
ExtractTextPlugin = require("extract-text-webpack-plugin")

# ## CONSTS

PATHS =
  app:
    src: './src/'
    entry: './src/person.coffee'
    dest: './build'
    name: 'app.js'
  libs:
    entry: './src/vendor.js'
    name: 'vendor.js'
    dest: './build'

LIBS = require(PATHS.libs.entry)

# ## Helpers

ENV = name: process.env.NODE_ENV or 'development'
ENV.compress = ENV.name is 'production'
ENV.watch = ENV.name is 'development'
ENV.debug = ENV.name isnt 'production'

log = (task, level) ->
  return (_msg) ->
    if level is 'err'
      msg = gutil.colors.red(_msg)
    else
      msg = _msg

    gutil.log(gutil.colors.cyan("[#{task}]"), msg)

# ## Processes

compile = ({env, libs}) ->
  return webpack
    entry:
      app: "coffee!#{PATHS.app.entry}"
      vendor: libs
    output:
      filename: PATHS.app.name
      path: PATHS.app.dest
    devtool: 'source-map'
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" }
      # {
      #   test: /\.css$/,
      #   loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      # }
      {
        test: /\.css$/,
        loader: "css-loader"
      }
    ]
    resolve:
      extensions: ['', '.js', '.coffee']
    plugins: [
      new ExtractTextPlugin("style.css", allChunks: true)
      new webpack.optimize.CommonsChunkPlugin('vendor', PATHS.libs.name)
    ]

compileStuff = ({env, libs, watch}, callback) ->
  notify = log('webpack', 'info')
  compiler = compile({env, libs})

  cb = (err, stats) ->
    notify stats.toString
      chunks: false
      colors: true

    throw new gutil.PluginError("webpack", err) if err

    callback() unless watch

  if watch
    compiler.watch 200, cb
  else
    compiler.run cb

# ## Tasks

gulp.task 'clean', ->
  gulp.src("#{PATHS.app.dest}/**/*", read: false)
  .pipe require('gulp-rimraf')()

gulp.task 'copy:assets', ->
  gulp.src("#{PATHS.app.src}/**/*.html")
  .pipe gulp.dest PATHS.app.dest

gulp.task 'copy:assets:watch', ['copy:assets'], ->
  gulp.watch("#{PATHS.app.src}/**/*.html", ['copy:assets'])

gulp.task 'magic:compile', (callback) ->
  compileStuff {
    env: ENV
    libs: LIBS
  }, callback

gulp.task 'magic:watch', (callback) ->
  compileStuff {
    env: ENV
    libs: LIBS
    watch: true
  }, callback

gulp.task 'default', ['clean', 'copy:assets', 'magic:compile']

gulp.task 'watch', ['clean', 'copy:assets:watch', 'magic:watch',]
