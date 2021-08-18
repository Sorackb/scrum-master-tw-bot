const { readdirSync, readFileSync } = require('fs');
const { extname, join, basename } = require('path');

const readAllJson = (folder) => {
  const files = readdirSync(folder).filter((file) => extname(file) === '.json');

  const content = files.reduce((accumulator, file) => {
    const data = readFileSync(join(folder, basename(file)));
    const key = file.split('.').slice(0, -1).join('.');
    const json = JSON.parse(data.toString());
    accumulator[key] = json;

    return accumulator;
  }, {});

  return content;
};

const getFromJSON = (object, path, value = '') => {
  const pathArray = Array.isArray(path) ? path : path.split('.').filter((key) => key);

  const pathArrayFlat = pathArray.flatMap((part) => (
    typeof part === 'string' ? part.split('.') : part
  ));

  return pathArrayFlat.reduce((obj, key) => obj && obj[key], object) || value;
};

// Durstenfeld shuffle
const shuffle = (array) =>{
  const copy = [...array];
  const { length } = copy;

  for (let i = length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

const makeCircularRandom = (array) => {
  let current = 0;
  let copy = shuffle(array);
  const { length } = copy;

  return () => {
    const item = copy[current];

    if (current === length - 1) {
      current = 0;
      copy = shuffle(array);
    } else {
      current += 1;
    }

    return item;
  };
};

module.exports = {
  readAllJson,
  getFromJSON,
  makeCircularRandom,
};
