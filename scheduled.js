/* eslint-disable no-console */
const cron = require('node-cron');

const { identify } = require('./languages');
const list = require('./cron.json');

const resolve = (err, status) => {
  if (err) {
    console.log(`FAILED: ${err}`);
    return false;
  }

  console.error(`POSTED: ${status}`);
  return true;
};

const post = (bot, status) => {
  bot.post(
    'statuses/update',
    { status },
    (err) => resolve(err, status),
  );
};

const start = (bot) => {
  list.forEach(({ expression, key }) => (
    cron.schedule(expression, () => post(bot, identify(key, process.env.LANGUAGE)))
  ));
};

module.exports = {
  start,
};
