import { resolve } from 'path';
import _ from 'lodash';

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
  const allKeys = [...new Set(keys1.concat(keys2))];
  const sortedKeys = _.sortBy(allKeys);

  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (Object.prototype.hasOwnProperty.call(data1, key)
        && Object.prototype.hasOwnProperty.call(data2, key)) {
      if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 != null) {
        return {
          keyStatus: KEY_NESTED_DIFF,
          key,
          nestedDiff: genDiff(value1, value2),
        };
      }
      if (value1 === value2) {
        return {
          keyStatus: KEY_UNCHANGED,
          key,
          first: value1,
        };
      }
      return {
        keyStatus: KEY_UPDATED,
        key,
        first: value1,
        second: value2,
      };
    }
    if (Object.prototype.hasOwnProperty.call(data1, key)) {
      return { keyStatus: KEY_DELETED, key, first: value1 };
    }
    return { keyStatus: KEY_ADDED, key, second: value2 };
  });
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
