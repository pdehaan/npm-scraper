# npm-scraper

Scrape npm registry for module dependencies.

## Usage:

Currently this repo isn't very useful (or extensible), but the basic gist is that you can scrape npm's registry for modules which depend on a specified module.

For example, if you want to see a roughly accurate list of all npm modules which depend on a confusingly named [**fs**](http://npm.im/fs) module, you'd so something like:

```js
scraper('fs')
  .then((stuff) => things)
  .catch((err) => console.error(err));
```

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

There's also a buried `getLatestPackageJson()` method which will get the specified module's latest package.json file from the npm registry as well, so you can scan the latest `dependencies` and `devDependencies` or whatever your deal is.

Like I say, probably not very useful to anybody else, but I seemingly end up rewriting this code every 6 months when I want to scan all npm modules which are depending on vulnerable versions of modules reported via the exceptionally awesome folks behind https://nodesecurity.io/advisories.
