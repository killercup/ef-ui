# Components: Episode Fever Front End

The files and folders in this directory are entry points, components and helpers for Episode Fever's React-based front end.

## Folder Structure of `src/`

- Entry points are the JS or JSX files in `src/`
- Folders starting with an underscore contain helpers that are included in most other files (e.g. `_helpers/` and `_styles/`)
- `pages/` contain the templates for the different routes
- all other folders are components

## Structure of a Component

Required files are:

- `index.jsx` exports the component
    + the component must have `displayName` and `render`
    + the component must validate `propTypes` using [react-prop-schema][1]
    + includes `require`s for all other components and helpers it uses
    + includes `require` for stylesheets it depends on
- `style.less` contains the main styles for the component
    + includes `@import`s for all other components, helpers and configs it depends on
- `demo.jsx` exports information for the style guide
    + `component`: the component itself
    + `name`: a name for the component (may just be `this.component.displayName`)
    + `demos`: an array of example instances of the component, may be generated using [react-prop-schema][1]'s `fake` method
- Other files may be added to split up functionality. If you feel the need for this, also consider splitting the one component into several smaller ones, though.

[1]: https://www.npmjs.org/package/react-prop-schema
