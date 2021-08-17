/* eslint-disable no-console */
const { get, readAllJson } = require('./tools');

const dictionary = readAllJson('./language');

console.log();

const identify = (key, language = 'ptbr', value = '') => get(dictionary, `${language}.${key}`, value);

module.exports = {
  identify,
};
