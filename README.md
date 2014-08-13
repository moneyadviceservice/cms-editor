# cms-editor

The Money Advice Service's CMS editor.

Uses [scribe](https://github.com/guardian/scribe/) for HTML content editing, [marked](https://github.com/chjj/marked) for Markdown to HTML conversion and **TBD** [to-markdown](https://github.com/domchristie/to-markdown) for HTML to Markdown conversion.

## Installation

```sh
npm install
bower install
```

## Run locally

Open `examples/index.html`

## Testing locally

We use [Karma](http://karma-runner.github.io) as our test runner.

With [karma-cli](https://www.npmjs.org/package/karma-cli):

```sh
npm test
```

Or for the direct command:

```sh
./node_modules/karma/bin/karma start test/karma.conf.js
```

`autoWatch` is on by default so tests will rerun whenever changes are made.

Use `--single-run` if you only want it to run once.

## Generating documentation

With a global jsdoc install:

```sh
jsdoc src/editor.js
```

Without:

```sh
./node_modules/.bin/jsdoc src/editor.js
```
