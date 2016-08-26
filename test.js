const {scraper} = require('./lib');

scraper('fs')
  .then((data) => data.filter(({repository}) => !!repository))
  .then((data) => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
