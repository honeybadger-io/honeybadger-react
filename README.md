# Honeybadger React.js Integration
[![Build Status](https://travis-ci.org/honeybadger-io/honeybadger-react.svg?branch=master)](https://travis-ci.org/honeybadger-io/honeybadger-react)

> [React.js integration for Honeybadger.io](https://www.honeybadger.io/for/javascript/?utm_source=github&utm_medium=readme&utm_campaign=react&utm_content=React.js+integration+for+Honeybadger.io)

## Documentation and Support

For comprehensive documentation and support, [check out our documentation site](https://docs.honeybadger.io/lib/javascript/index.html).

The documentation includes a detailed [React integration guide](https://docs.honeybadger.io/lib/javascript/integration/react.html)

## Project Goals

The goal is to provide an idiomatic, simple integration of Honeybadger's
exception monitoring service with React.js applications.

## Project Status

This version is considered suitable for preview.

## Usage

### HoneyBadgerErrorBoundary Props

<dl>
  <dt><code>honeybadger</code></dt>
  <dd>The Honeybadger config object.</dd>
  <dt><code>children</code></dt>
  <dd>Your root `<App />` component.</dd>

  <dt><code>ErrorComponent</code> (optional &mdash; default: "DefaultErrorComponent")</dt>
  <dd>The component that will be rendered in <code> ErrorBoundary </code> children's place when an error is thrown during React rendering. The default value for this prop is the <code>DefaultErrorComponent</code>.
</dd>
</dl>

### In your main.js

```jsx
ReactDOM.render(
  <ErrorBoundary honeybadger={honeybadger}>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
)

```

### DefaultErrorComponent

```jsx
class DefaultErrorComponent extends Component {
  render() {
    return (
      <div className='error'>
        <div>An Error Occurred</div>
        <div>{this.error}</div>
        <div>{this.info}</div>
      </div>
    )
  }
}
```

## Limitations

Honeybadger-react hooks in to the error handler in React. This means we only
notify Honeybadger of React context for errors that React handles. Some
errors inside React code may propagate to the window onerror handler
instead.

In those cases, Honeybadger Javascript library's default error notifier
is invoked, which will contain a stack trace but none of the React
variables.

## Key Assumptions

This project is built using create-react-library with rollup and generates
artifacts in commonjs, esm and umd formats. It's possible
your own build environment may be just different enough to require some
adjustments. If you find that our artifacts don't quite meet your needs,
please [file an issue on GitHub](https://github.com/honeybadger-io/honeybadger-react/issues).

## Changelog

See https://github.com/honeybadger-io/honeybadger-react/blob/master/CHANGELOG.md

## Contributing

1. Fork it.
2. Create a topic branch `git checkout -b my_branch`
3. Commit your changes `git commit -am "Boom"`
3. Push to your branch `git push origin my_branch`
4. Send a [pull request](https://github.com/honeybadger-io/honeybadger-react/pulls)

## Development

``` bash
# install dependencies
yarn install

# build for production
yarn build

# run unit tests
yarn test

# automatically continuously rebuild the dist/ artifacts with hot reload when developing
yarn start
```

## Example app

There's a minimal implementation of a honeybadger-react integration in the ./example
folder. If you want to contribute a patch to honeybadger-react, it can be useful to have
the demo app running.

To run it, issue these commands from your shell:

```bash
cd example
yarn install
REACT_APP_HONEYBADGER_API_KEY=b425b636 yarn start
```

This will serve the demo app with hot reload at localhost:3000

For a detailed explanation on how hot reloading works, check out the [guide](http://reactjs-templates.github.io/webpack/) and [docs for react-loader](http://reactjs.github.io/react-loader).

### License

*honeybadger-react* is MIT licensed. See the [LICENSE](https://raw.github.com/honeybadger-io/honeybadger-react/master/LICENSE) file in this repository for details.
