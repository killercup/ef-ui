# EpisodeFever Front End

This is the React-based front end for EpisodeFever.

## Technology

It uses [Webpack][webpack] to compile CommonJS modules (in JS or JSX) and the therein referenced Less files. It will also create HTML files for each entry point.

### Getting Started

After cloning the repository, `npm install` will install all dependencies.

With `npm start` you can start webpack's development server (on port 3000) which also enables [Hot Module Replacement][HMR] for CSS and React classes.

To create a production build, use `npm run compile`. This will minify all output files, create a separate CSS file, and optimize the JS code (e.g. remove all branches that are `false` when `NODE_ENV === 'production'`).

[webpack]: http://webpack.github.io/
[HMR]: http://webpack.github.io/docs/hot-module-replacement.html

### Server Side Rendering

It works. `npm run server` is all you need. (Needs `npm run compile` to be run first to generate static assets.)

## Stores and Flux: Some Concepts and Ideas

The following is just a bunch of ideas. They do not represent the current state of this implementation.

### What are stores

- Native
	- Stores are native JS objects, keys are database IDs
	- Filtering and stuff happens in the views: `shows = Store.shows.filter(x => x.aired < Date.now())`
		- Transducers.
	- All queries should be by id for performance reasons
		- Relations should be stored using embedded arrays of ids: `user = {name: String, vote_ids: Array<Id>}`
	- Updates are made using events/callbacks: `Store.trigger(event: String, store: String, id: Id, payload: Object) -> Promise`
		- Using `React.addons.update` to become immutable
	- App is notified of change via 'changed' event
- Classes
	- Stores are classes, storing data in `this.data: Object`
	- Stores are properties of an `AppState` object
	- Queries are instance methods
		- using transducers for great good
	- Updates are instance methods, using `React.addons.update`
	- Stores emit a 'changed' event, which bubbles up to the AppState, which the App listens to
- Immutable1
	- Stores are Immutable.Map instances, but otherwise like "native"
- Immutable2
	- Using cursors

### Data propagations

- AppState
	- App has `this.prop.AppState` or `AppState === @state`
	- Pages/Locations get AppState as prop, filter on their own
- Locations request data from Store
	- Locations query stores directly, `shows = require('../stores').Shows.latest({num: 12})`
