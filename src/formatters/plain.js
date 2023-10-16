import {
  KEY_UNCHANGED,
  KEY_ADDED,
  KEY_DELETED,
  KEY_UPDATED,
  KEY_NESTED_DIFF,
} from '../consts.js';

const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getDiffLines = (diff, parents) => {
  const lines = [];
  let keyPrefix = '';
  if (parents !== '') {
    keyPrefix = `${parents}.`;
  }
  for (let i = 0; i < diff.length; i += 1) {
    const currDiff = diff[i];
    if (currDiff.keyStatus === KEY_UNCHANGED) {
      continue;
    }
    const key = `${keyPrefix}${currDiff.key}`;
    switch (currDiff.keyStatus) {
      case KEY_ADDED:
        lines.push(`Property '${key}' was added with value: ${formatValue(currDiff.second)}`);
        break;
      case KEY_DELETED:
        lines.push(`Property '${key}' was removed`);
        break;
      case KEY_UPDATED:
        lines.push(`Property '${key}' was updated. From ${formatValue(currDiff.first)} to ${formatValue(currDiff.second)}`);
        break;
      case KEY_NESTED_DIFF:
        lines.push(...getDiffLines(currDiff.nestedDiff, key));
        break;
      default:
        throw new Error(`unknown key status: ${currDiff.keyStatus}`);
    }
  }
  return lines;
};

const plainFormatter = (diff) => getDiffLines(diff, '').join('\n');

export default plainFormatter;
