const cron = require('node-cron');

const { identify } = require('./languages');
const list = require('./cron.json');

const resolve = (err) => {
  if (err) {
    console.log(`FAILED: ${err}`);
    return false;
  }

  console.log(`POSTED: ${status}`);
}

const post = (bot, status) => {
  bot.post(
    'statuses/update',
    { status },
    resolve,
 );
};

const start = (bot) => {
  list.forEach(({ expression, key }) => cron.schedule(expression, () => post(bot, identify(key, process.env.LANGUAGE))));
};

module.exports = {
  start,
};
