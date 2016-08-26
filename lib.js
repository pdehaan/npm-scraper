const url = require('url');

const fetch = require('node-fetch');
const getPackageJson = require('get-package-json');

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
        prev.push({name, desc});
        return prev;
      }, []);
      return {
        name: moduleName,
        dependents
      };
    });
}

function getLatestPackageJson(name) {
  return getPackageJson(name)
    .then(({pkg}) => {
      const latest = pkg['dist-tags'].latest;
      pkg.versions[latest].modified = new Date(pkg.time.modified);
      return pkg.versions[latest];
    })
    .then(({name, version, repository=null, dependencies={}, devDependencies={}, modified}) => {
      return {
        name,
        version,
        repository,
        modified,
        // dependencies,
        // devDependencies
      }
    });
}

module.exports = {
  getLatestPackageJson,
  scraper
};
