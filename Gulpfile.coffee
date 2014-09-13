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
    entry: './src/index.coffee'
    dest: './build'
  styleguide:
    src: './src/'
    entry: './src/styleguide.coffee'
    dest: './build'
  libs:
    entry: './src/vendor.js'
    name: 'vendor.js'
    dest: './build'

LIBS = require(PATHS.libs.entry)

ENTRIES =
  app: "#{PATHS.app.entry}"
  styleguide: "#{PATHS.styleguide.entry}"
  vendor: LIBS

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

compile = ({env, entries}) ->
  config =
    entry: entries
    output:
      filename: "[name].js"
      path: PATHS.app.dest
    devtool: 'source-map'
    module:
      loaders: [
        { test: /\.coffee$/, loader: "coffee-loader" }
        { test: /\.(less|css)$/, loader: ExtractTextPlugin.extract('css-loader!autoprefixer-loader!less-loader') }
      ]
    resolve:
      extensions: ['', '.js', '.coffee', '.css', '.less']
    plugins: [
      new webpack.DefinePlugin
        "process.env":
          NODE_ENV: JSON.stringify(env.name or "development")
      new webpack.optimize.CommonsChunkPlugin('vendor', PATHS.libs.name)
      new ExtractTextPlugin("app.css", allChunks: true)
    ]

  if env.compress
    config.plugins = config.plugins.concat [
      # new webpack.optimize.DedupePlugin()
      new webpack.optimize.OccurenceOrderPlugin(true)
      # new webpack.optimize.AggressiveMergingPlugin(moveToParents: true)
      new webpack.optimize.UglifyJsPlugin()
    ]
  
  return webpack(config)
    

compileStuff = ({env, entries, watch}, callback) ->
  notify = log('webpack', 'info')
  compiler = compile({env, entries})

  cb = (err, stats) ->
    notify stats.toString
      chunks: false
      colors: true
      warnings: false
      children: false

    if env.debug_stats
      json_stats = JSON.stringify stats.toJson(), null, 2
      require('fs').writeFileSync('webpack-stats.json', json_stats)

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
    entries: ENTRIES
  }, callback

gulp.task 'magic:watch', (callback) ->
  compileStuff {
    env: ENV
    entries: ENTRIES
    watch: true
  }, callback

gulp.task 'default', ['clean', 'copy:assets', 'magic:compile']

gulp.task 'watch', ['clean', 'copy:assets:watch', 'magic:watch',]
