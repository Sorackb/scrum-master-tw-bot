const { getFromJSON, readAllJson } = require('./tools');

const dictionary = readAllJson('./language');

const identify = (key, language = 'ptbr', value = '') => getFromJSON(dictionary, `${language}.${key}`, value);

module.exports = {
  identify,
};
