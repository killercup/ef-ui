# Components: Episode Fever Front End

The files and folders in this directory are entry points, components and helpers for Episode Fever's React-based front end.

## Folder Structure of `src/`

- Entry points are special JS or JSX files in `src/` that are specified in the Gulpfile.
- Each interface component lives in a directory in `src/components/`.
- Common styles are in `src/styles/`, common functionality in `src/helpers/`.

## Pages and Templates

There are two special subdirectories in `src/components/`: `_pages/` and `_templates/`.

Pages contain React components that are children of route handlers (as defined in `src/routes.jsx`). It is their job to load data from stores, handle updates of data and (partially) process data for their child components.

The render method of most pages should is only one line: `return <Template {...this.state}/>`.

Templates receive all their data from the page that includes them. They define the layout of a view and compose smaller components to which they propagate their data.

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
