#!/usr/bin/env node

const argv = require('yargs')
  .usage('Usage: $0 -n [string]')
  .alias('n', 'name')
  .demand(['n'])
  .argv;

const { scraper } = require('../lib');

scraper(argv.name)
  // .then((data) => data.filter(({repository}) => !!repository))
  .then((data) => console.log(JSON.stringify(data, null, 2)))
  .catch(console.error);
