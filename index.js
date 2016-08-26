const {getLatestPackageJson, scraper} = require('./lib');

scraper('fs')
  .then(({dependents}) => {
    const dependentsMap = dependents.map(({name}) => getLatestPackageJson(name));
    return Promise.all(dependentsMap);
  })
  .then((data) => {
    return data.filter(({repository}) => !!repository)
      .sort((pkgA, pkgB) => new Date(pkgB.modified) - new Date(pkgA.modified))
      .map((res) => {
        res.repository = res.repository.url
          .replace(/^git\+/, '')
          .replace(/^git:/, 'https:')
        return res;
      });
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(console.error);
