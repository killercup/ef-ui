# # Frontend Build Process

path = require('path')
gulp = require('gulp')
gutil = require('gulp-util')
plumber = require('gulp-plumber')

webpack = require("webpack")

# ## CONSTS

PATHS =
  app:
    src: './src/'
    entry: './src/index.coffee'
    dest: path.resolve './build'
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

process.env.NODE_ENV or= 'development'
is_production = process.env.NODE_ENV is 'production'
is_development = process.env.NODE_ENV is 'development'

ENV =
  name: process.env.NODE_ENV
  compress: is_production
  watch: is_development
  debug: is_development
  debug_stats: true
  bundleCSS: is_production
  dev_server: is_development
  dev_port: 3000

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
        { test: /\.coffee$/, loader: "react-hot!coffee-loader" }
      ]
    resolve:
      extensions: ['', '.js', '.coffee', '.css', '.less']
    plugins: [
      new webpack.DefinePlugin
        "process.env":
          NODE_ENV: JSON.stringify(env.name or "development")
      new webpack.optimize.CommonsChunkPlugin('vendor', PATHS.libs.name, Infinity)
    ]

  if env.bundleCSS
    ExtractTextPlugin = require("extract-text-webpack-plugin")
    config.module.loaders.push
      test: /\.(less|css)$/
      loader: ExtractTextPlugin.extract('css-loader!autoprefixer-loader!less-loader')
    config.plugins.push new ExtractTextPlugin("app.css", allChunks: true)
  else
    config.module.loaders.push
      test: /\.(less|css)$/
      loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'

  if env.compress
    config.plugins = config.plugins.concat [
      # new webpack.optimize.DedupePlugin()
      new webpack.optimize.OccurenceOrderPlugin(true)
      # new webpack.optimize.AggressiveMergingPlugin(moveToParents: true)
      new webpack.optimize.UglifyJsPlugin()
    ]

  if env.dev_server
    config.plugins.push new webpack.HotModuleReplacementPlugin()
    config.entry.hot = [
      "webpack-dev-server/client?http://localhost:#{env.dev_port}"
      "webpack/hot/dev-server"
    ]
  
  return webpack(config)
    

compileStuff = ({env, entries, watch}, callback) ->
  notify = log('webpack', 'info')
  compiler = compile({env, entries})
  STATS_SETTINGS =
    chunks: false
    colors: true
    warnings: false
    children: false

  cb = (err, stats) ->
    notify stats.toString STATS_SETTINGS

    if env.debug_stats
      json_stats = JSON.stringify stats.toJson(), null, 2
      require('fs').writeFileSync('webpack-stats.json', json_stats)

    throw new gutil.PluginError("webpack", err) if err

    callback() unless watch

  if watch
    if env.dev_server
      DevServer = require("webpack-dev-server")

      server = new DevServer compiler,
        contentBase: PATHS.app.dest
        hot: true
        watchDelay: 100
        stats: STATS_SETTINGS
      server.listen env.dev_port, ->
        notify "Dev server started on http://localhost:#{env.dev_port}/"
    else
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

gulp.task 'gzip', ->
  gulp.src("#{PATHS.app.dest}/*.{js,html,css}")
  .pipe require('gulp-gzip')(gzipOptions: { level: 9 })
  .pipe gulp.dest(PATHS.app.dest)

gulp.task 'default', (cb) ->
  require('run-sequence')('clean',
    ['copy:assets', 'magic:compile']
    'gzip'
    cb
  )

gulp.task 'watch', (cb) ->
  require('run-sequence')('clean',
    ['copy:assets:watch', 'magic:watch']
    cb
  )
