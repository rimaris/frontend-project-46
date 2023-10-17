import { resolve } from 'path';
import parseFile from './parsers.js';
import getFormatter from './formatters/index.js';

import {
  KEY_UNCHANGED,
  KEY_ADDED,
  KEY_DELETED,
  KEY_UPDATED,
  KEY_NESTED_DIFF,
} from './consts.js';

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = keys1.concat(keys2);
  const sortedKeys = allKeys.sort();

  const result = [];
  for (let i = 0; i < sortedKeys.length; i += 1) {
    const key = sortedKeys[i];
    if (i !== 0 && sortedKeys[i - 1] === key) {
      continue;
    }
    const value1 = data1[key];
    const value2 = data2[key];
    if (Object.prototype.hasOwnProperty.call(data1, key)
        && Object.prototype.hasOwnProperty.call(data2, key)) {
      if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 != null) {
        result.push({
          keyStatus: KEY_NESTED_DIFF,
          key,
          nestedDiff: genDiff(value1, value2),
        });
      } else if (value1 === value2) {
        result.push({
          keyStatus: KEY_UNCHANGED,
          key,
          first: value1,
        });
      } else {
        result.push({
          keyStatus: KEY_UPDATED,
          key,
          first: value1,
          second: value2,
        });
      }
    } else if (Object.prototype.hasOwnProperty.call(data1, key)) {
      result.push({ keyStatus: KEY_DELETED, key, first: value1 });
    } else {
      result.push({ keyStatus: KEY_ADDED, key, second: value2 });
    }
  }
  return result;
};

const parseFilesAndGenDiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePath1 = resolve(filepath1);
  const absolutePath2 = resolve(filepath2);

  const data1 = parseFile(absolutePath1);
  const data2 = parseFile(absolutePath2);
  const result = genDiff(data1, data2);

  const formatter = getFormatter(format);
  return formatter(result);
};

export default parseFilesAndGenDiff;
