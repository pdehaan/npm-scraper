const url = require('url');

const fetch = require('node-fetch');
const getPackageJson = require('get-package-json');
const gitUrlParse = require('git-url-parse');
const sortJson = require('sort-json');

function scraper(moduleName, limit=500) {
  const dependedUponUrl = url.format({
    protocol: 'https',
    host: 'registry.npmjs.org/-/_view/dependedUpon',
    query: {
      group_level: 3,
      startkey: `["${moduleName}"]`,
      endkey: `["${moduleName}",{}]`,
      skip: 0,
      limit
    }
  });
  return fetch(dependedUponUrl)
    .then((res) => res.json())
    .then(({rows}) => {
      const dependents = rows.reduce((prev, {key:[mod, name, desc]}) => {
        prev.push(name);
        return prev;
      }, []);
      return Promise.all(dependents.map(getLatestPackageJson));
    })
    .then((dependents) => {
      // Sort all the modules by last published date descending (newest on top).
      const sortModifiedDesc = (pkgA, pkgB) => new Date(pkgB.modified) - new Date(pkgA.modified);
      return dependents.sort(sortModifiedDesc);
    });
}

function getLatestPackageJson(name) {
  return getPackageJson(name)
    .then(({pkg}) => {
      const latestVer = pkg['dist-tags'].latest;
      const latestPkg = pkg.versions[latestVer];
      latestPkg.modified = pkg.time.modified; // inject modified date.
      return latestPkg;
    })
    .then(({name, version, repository=null, dependencies={}, devDependencies={}, modified}) => {
      const fixRepository = (repo) => {
        if (repo && repo.url) {
          return gitUrlParse(repo.url).toString('https') || repo.url;
        }
        // Something is wrong with the repository in package.json. Give up.
        return null;
      };
      repository = fixRepository(repository);

      return sortJson({
        name,
        version,
        repository,
        modified,
        dependencies,
        devDependencies
      })
    });
}

module.exports = {
  getLatestPackageJson,
  scraper
};
