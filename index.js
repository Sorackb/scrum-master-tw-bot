const cron = require('node-cron');
const Twit = require('twit');

const { identify } = require('./languages');
const list = require('./cron.json');

list.forEach(({ expression, key }) => cron.schedule(expression, () => console.log(identify(key))));