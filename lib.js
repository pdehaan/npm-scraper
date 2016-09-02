const { dependedUpon } = require('npm-depended-upon');
const nicePackage = require('fetch-nice-package');

function sortModifiedDesc(pkgA, pkgB) {
  return new Date(pkgB.modified) - new Date(pkgA.modified);
}

function scraper(moduleName, limit=500) {
  return dependedUpon(moduleName, {limit})
    .then((dependents) => dependents.map((name) => getPackageJson(name)))
    .then((dependents) => Promise.all(dependents))
    .then((dependents) => dependents.sort(sortModifiedDesc));
}

function getPackageJson(name) {
  return nicePackage(name)
    .then((pkg) => {
      // Return a subset of the package.json keys.
      return {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        repository: pkg.repository && pkg.repository.https_url || pkg.repository,
        dependencies: pkg.dependencies || {},
        devDependencies: pkg.devDependencies || {},
        peerDependencies: pkg.peerDependencies,
        created: pkg.created,
        modified: pkg.modified
      };
    });
}

module.exports = {
  scraper
};
