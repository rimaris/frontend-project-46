import { readFileSync } from 'fs';
import { load } from 'js-yaml';

const parseFile = (filepath) => {
  const data = readFileSync(filepath);
  const splitted = filepath.split('.');
  const fileExt = splitted[splitted.length - 1];

  switch (fileExt) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return load(data);
    default:
      throw new Error(`unknown file extension: ${fileExt}`);
  }
};

export default parseFile;
