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

Currently if you run `$ node index`, the output looks roughly like this:

```js
[
  {
    "name": "hylla",
    "version": "0.0.6",
    "repository": "https://github.com/tpoisot/hylla.git",
    "modified": "2016-08-26T16:57:57.904Z"
  },
  {
    "name": "ensime-client",
    "version": "0.7.0",
    "repository": "https://github.com/ensime/ensime-node.git",
    "modified": "2016-08-25T15:46:52.514Z"
  },
  ...
]
```

There's also a buried `getLatestPackageJson()` method which will get the specified module's latest package.json file from the npm registry as well, so you can scan the latest `dependencies` and `devDependencies` or whatever your deal is.

Like I say, probably not very useful to anybody else, but I seemingly end up rewriting this code every 6 months when I want to scan all npm modules which are depending on vulnerable versions of modules reported via the exceptionally awesome folks behind https://nodesecurity.io/advisories.

I'll probably improve this so it's a proper `module.exports` at some point, but don't hold your breath.
