/* eslint-disable no-console */
const { getFromJSON, readAllJson } = require('./tools');

const dictionary = readAllJson('./language');

console.log();

const identify = (key, language = 'ptbr', value = '') => getFromJSON(dictionary, `${language}.${key}`, value);

module.exports = {
  identify,
};
