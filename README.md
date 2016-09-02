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
    "name": "djms",
    "version": "0.1.0",
    "description": "media file response",
    "repository": "https://github.com/odj0220/djms",
    "dependencies": {
      "btoa": "^1.1.2",
      "fs": "0.0.2",
      "jsmediatags": "^3.2.1"
    },
    "devDependencies": {},
    "created": "2016-09-01T07:05:36.161Z",
    "modified": "2016-09-01T07:05:36.161Z"
  },
  {
    "name": "djfileio",
    "version": "0.1.3",
    "description": "node file IO controll module",
    "repository": "https://github.com/odj0220/djfileio",
    "dependencies": {
      "formidable": "^1.0.17",
      "fs": "0.0.2",
      "mongodb": "^2.2.5"
    },
    "devDependencies": {},
    "created": "2016-08-24T04:11:36.991Z",
    "modified": "2016-08-31T05:20:43.733Z"
  },
  ...
]
```

Like I say, probably not very useful to anybody else, but I seemingly end up rewriting this code every 6 months when I want to scan all npm modules which are depending on vulnerable versions of modules reported via the exceptionally awesome folks behind https://nodesecurity.io/advisories.
