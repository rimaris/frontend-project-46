import { resolve } from 'path';
import parseFile from './parsers.js';

export const genDiff = (data1, data2) => {
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
    if (Object.prototype.hasOwnProperty.call(data1, key)
        && Object.prototype.hasOwnProperty.call(data2, key)) {
      if (data1[key] === data2[key]) {
        result.push(`  ${key}: ${data1[key]}`);
      } else {
        result.push(`- ${key}: ${data1[key]}`);
        result.push(`+ ${key}: ${data2[key]}`);
      }
    } else if (Object.prototype.hasOwnProperty.call(data1, key)) {
      result.push(`- ${key}: ${data1[key]}`);
    } else {
      result.push(`+ ${key}: ${data2[key]}`);
    }
  }
  return result;
};

export const parseFilesAndPrintDiff = (filepath1, filepath2) => {
  const absolutePath1 = resolve(filepath1);
  const absolutePath2 = resolve(filepath2);

  const data1 = parseFile(absolutePath1);
  const data2 = parseFile(absolutePath2);
  const result = genDiff(data1, data2);
  const resultStr = result.map((x) => `  ${x}`).join('\n');
  return `{\n${resultStr}\n}`;
};

export default parseFilesAndPrintDiff;
