/* eslint-disable no-console */
const cron = require('node-cron');

const { identify } = require('./languages');
const { makeCircularRandom } = require('./tools');
const records = require('./cron.json');

const resolve = (err, status) => {
  if (err) {
    console.log(`FAILED: ${err}`);
    return false;
  }

  console.error(`POSTED: ${status}`);

  return true;
};

const fire = (bot, record) => {
  const status = record.phrase ?? record.execution();
  bot.post('statuses/update', { status }, (err) => resolve(err, status));
};

const start = (bot) => {
  const keys = records.map((record) => record.key);
  const uniques = [...(new Set(keys))];
  const dictionary = uniques.reduce((accumulator, key) => {
    const value = identify(key, process.env.LANGUAGE);

    accumulator[key] = Array.isArray(value)
      ? { execution: makeCircularRandom(value) }
      : { phrase: value };

    return accumulator;
  }, {});

  records.forEach(({ expression, key }) => (
    cron.schedule(expression, () => fire(bot, dictionary[key]))
  ));
};

module.exports = {
  start,
};
