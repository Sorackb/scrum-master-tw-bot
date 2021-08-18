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

const post = (bot, keys) => {
  const index = Math.floor(Math.random() * keys.length);
  const key = keys[index];
  const status = identify(key, process.env.LANGUAGE);

  bot.post(
    'statuses/update',
    { status },
    (err) => resolve(err, status),
  );
};

const start = (bot) => {
  list.forEach(({ expression, keys }) => (
    cron.schedule(expression, () => post(bot, keys))
  ));
};

module.exports = {
  start,
};
