# # Frontend Build Process

path = require('path')
gulp = require('gulp')
gutil = require('gulp-util')
plumber = require('gulp-plumber')
l = require('lodash')

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

outputHtml = (opts) ->
  HtmlWebpackPlugin = require('html-webpack-plugin')

  new HtmlWebpackPlugin l.defaults {}, opts,
    filename: 'index.html'
    template: 'src/index.html'
    include: (assetsByChunkName, chunk, filetype) ->
      assets = assetsByChunkName[chunk]
      if l.isString(assets)
        assets = [assets]

      return "" unless assets?.length

      filetypeCheck = new RegExp("\.#{filetype}$")
      if filetype is 'js'
        filetypeMap = (src) -> "<script src='#{src}'></script>"
      else if filetype is 'css'
        filetypeMap = (src) -> "<link rel='stylesheet' href='#{src}'/>"
      else
        filetypeMap = -> ""

      return assets
      .filter (name) -> filetypeCheck.test(name)
      .map(filetypeMap)
      .join('\n')

compile = ({env, entries}) ->
  config =
    entry: entries
    output:
      filename: "[name]-[chunkhash].js"
      path: PATHS.app.dest
    target: 'web'
    debug: env.debug
    devtool: if env.debug then 'eval' else 'source-map'
    module:
      loaders: [
        { test: /\.coffee$/, loader: "react-hot!coffee-loader" }
        { test: /\.(png|gif)$/, loader: "url-loader?limit=4000" }
        { test: /\.jpg$/, loader: "file-loader" }
      ]
    resolve:
      extensions: ['', '.js', '.coffee', '.css', '.less']
      alias:
        lodash: 'lodash/dist/lodash.js'
    plugins: [
      new webpack.DefinePlugin
        "process.env":
          NODE_ENV: JSON.stringify(env.name)
          BROWSER: JSON.stringify(true)
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[chunkhash].js', Infinity)
      outputHtml
        filename: 'index.html'
        chunk: 'app'
        env: env
      outputHtml
        filename: 'styleguide.html'
        title: 'EpisodeFever Styleguide'
        chunk: 'styleguide'
        env: env
    ]

  if env.bundleCSS
    ExtractTextPlugin = require("extract-text-webpack-plugin")
    config.module.loaders.push
      test: /\.(less|css)$/
      loader: ExtractTextPlugin.extract('css-loader?sourceMap!autoprefixer-loader!less-loader')
    config.plugins.push new ExtractTextPlugin("app-[hash].css", allChunks: true)
  else
    config.module.loaders.push
      test: /\.(less|css)$/
      loader: 'style-loader!css-loader?sourceMap!autoprefixer-loader!less-loader'

  if env.compress
    config.plugins = config.plugins.concat [
      new webpack.optimize.DedupePlugin()
      new webpack.optimize.OccurenceOrderPlugin(true)
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
  compiler = compile({env: env, entries: entries})
  STATS_SETTINGS =
    chunks: false
    colors: true
    warnings: false
    children: false

  notify "Building in #{env.name} environment."

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

# ## General Tasks

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

gulp.task 'coffeelint', ->
  coffeelint = require('gulp-coffeelint')
  gulp.src('src/**/*.coffee')
  .pipe coffeelint()
  .pipe coffeelint.reporter()

gulp.task 'coffeelint:watch', ->
  gulp.watch 'src/**/*.coffee', ['coffeelint']

gulp.task 'gzip', ->
  gulp.src("#{PATHS.app.dest}/*.{js,html,css}")
  .pipe require('gulp-gzip')(gzipOptions: { level: 9 })
  .pipe gulp.dest(PATHS.app.dest)

# ## Public Tasks

gulp.task 'default', (cb) ->
  require('run-sequence')('clean',
    'magic:compile'
    'gzip'
    cb
  )

gulp.task 'watch', (cb) ->
  require('run-sequence')('clean',
    ['coffeelint:watch', 'magic:watch']
    cb
  )

gulp.task 'lint', ['coffeelint']

gulp.task 'test', ->
  gulp.src('src/**/*_spec.{js,coffee}', read: false)
  .pipe require('gulp-mocha')(reporter: 'spec')
