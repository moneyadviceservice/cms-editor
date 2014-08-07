# cms-editor

The Money Advice Service's CMS.

Uses [scribe](https://github.com/guardian/scribe/) for content editing.

## Installation

```sh
npm install
```

## Run locally

Open `src/index.html`

## Testing locally

We use [Karma](http://karma-runner.github.io) as our test runner.

With [karma-cli](https://www.npmjs.org/package/karma-cli):

```sh
karma start test/karma.conf.js
```

Without karma-cli:

```sh
./node_modules/karma/bin/karma start test/karma.conf.js
```

`autoWatch` is on by default so tests will rerun whenever changes are made.

Use `--single-run` if you want it to run once.
