const { readdirSync, readFileSync } = require('fs');
const path = require('path');

const readAllJson = (folder) => {
  const files = readdirSync(folder).filter(file => path.extname(file) === '.json');

  const content = files.reduce((accumulator, file) => {
    const data = readFileSync(path.join(folder, path.basename(file)));
    const key = file.split('.').slice(0, -1).join('.');
    const json = JSON.parse(data.toString());
    accumulator[key] = json;

    return accumulator;
  }, {});

  return content;
};

const get = (object, path, value = '') => {
  const pathArray = Array.isArray(path) ? path : path.split('.').filter(key => key)
  const pathArrayFlat = pathArray.flatMap(part => typeof part === 'string' ? part.split('.') : part)

  return pathArrayFlat.reduce((obj, key) => obj && obj[key], object) || value;
};

module.exports = {
  readAllJson,
  get,
};
