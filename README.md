# npm-scraper

## Why?

Because you want to scrape npm's registry for modules which depend on a specified module. For example, get a list of all modules that depend on the `request` module, and return their package.json from their latest published module in npm.

## Installation:

This module isn't published on npm (because it's lame), but if you really want it, you can install directly from GitHub using something like:

```sh
$ npm i pdehaan/npm-scraper -S
```

## Usage:

### API:

For example, if you want to see a roughly accurate list of all npm modules which depend on a confusingly named [**fs**](http://npm.im/fs) module, you'd so something like:

```js
scraper('fs')
  // Ignore modules that don't specify a repository, because they are bad citizens.
  .then((data) => data.filter(({repository}) => !!repository))
  .then((data) => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
```

### CLI:

You can also install this module globally, or simply install it locally and add the `npm-scraper` script and specify your module name using the `-n {name}` flag:

```json
"scripts": {
  "api": "node test",
  "cli": "npm-scraper -n path",
  "test": "npm run api"
}
```

## Output:

Currently if you run `$ node test`, the output looks roughly like this:

```js
[
  {
    "dependencies": {
      "diacritics": "^1.2.3",
      "fs": "0.0.2",
      "fuzzaldrin": "^2.1.0",
      "keyword-extractor": "0.0.12",
      "os": "^0.1.1",
      "path": "^0.12.7",
      "sync-request": "^3.0.1"
    },
    "devDependencies": {
      "chai": "^3.5.0",
      "coveralls": "^2.11.9",
      "eslint": "^2.10.2",
      "eslint-config-google": "^0.5.0",
      "istanbul": "^0.4.3",
      "mocha": "^2.4.5",
      "mocha-lcov-reporter": "^1.2.0"
    },
    "modified": "2016-08-26T16:57:57.904Z",
    "name": "hylla",
    "repository": "https://github.com/tpoisot/hylla",
    "version": "0.0.6"
  },
  ...
]
```

Like I say, probably not very useful to anybody else, but I seemingly end up rewriting this code every 6 months when I want to scan all npm modules which are depending on vulnerable versions of modules reported via the exceptionally awesome folks behind https://nodesecurity.io/advisories.
