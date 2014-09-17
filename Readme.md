# EpisodeFever Front End

This is the React-based front end for EpisodeFever.

## Technology

It uses [webpack] to compile CommonJS modules (in JS or CoffeeScript) and the therein referenced Less files. It will also create HTML files for each entry point.

### Getting Started

After cloning the repository, `npm install` will install all dependencies.

With `npm run watch` you can start webpack's development server (on port 3000) which also enables [Hot Module Replacement][HMR] for CSS and React classes.

To create a production build, use `npm run compile`. This will minify all output files, create a separate CSS file, and optimize the JS code (e.g. remove all branches that are `false` when `NODE_ENV === 'production'`).

[webpack]: http://webpack.github.io/
[HMR]: http://webpack.github.io/docs/hot-module-replacement.html