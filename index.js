/* eslint-disable no-console */
const Twit = require('twit');
const dotenv = require('dotenv');

const cron = require('./cron');

console.time('Starting');

dotenv.config();

const bot = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

cron.start(bot);

console.timeEnd('Starting');
