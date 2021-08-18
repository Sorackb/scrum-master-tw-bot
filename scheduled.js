/* eslint-disable no-console */
const cron = require('node-cron');

const { identify } = require('./languages');
const list = require('./cron.json');
const { makeCircularRandom } = require('./tools');

const resolve = (err, status) => {
  if (err) {
    console.log(`FAILED: ${err}`);
    return false;
  }

  console.error(`POSTED: ${status}`);
  return true;
};

const post = (bot, status) => (
  bot.post(
    'statuses/update',
    { status },
    (err) => resolve(err, status),
  )
);

const start = (bot) => {
  const dictionary = {};

  list.forEach(({ expression, key }) => {
    if (!dictionary.hasOwnProperty(key)) {
      const value = identify(key, process.env.LANGUAGE);
      if (Array.isArray(value)) {
        dictionary[key] = { execution: makeCircularRandom(value) };
      } else {
        dictionary[key] = { phrase: value };
      }
    }

    cron.schedule(expression, () => {
      const status = dictionary[key].phrase ?? dictionary[key].execution();
      post(bot, status);
    });
  });
};

module.exports = {
  start,
};
