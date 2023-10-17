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
  const keyPrefix = parents !== '' ? `${parents}.` : '';

  const lines = diff.map((currDiff) => {
    if (currDiff.keyStatus === KEY_UNCHANGED) {
      return '';
    }
    const key = `${keyPrefix}${currDiff.key}`;
    switch (currDiff.keyStatus) {
      case KEY_ADDED:
        return `Property '${key}' was added with value: ${formatValue(currDiff.second)}`;
      case KEY_DELETED:
        return `Property '${key}' was removed`;
      case KEY_UPDATED:
        return `Property '${key}' was updated. From ${formatValue(currDiff.first)} to ${formatValue(currDiff.second)}`;
      case KEY_NESTED_DIFF:
        return getDiffLines(currDiff.nestedDiff, key);
      default:
        throw new Error(`unknown key status: ${currDiff.keyStatus}`);
    }
  });
  return lines.filter((elem) => elem !== '').flat();
};

const plainFormatter = (diff) => getDiffLines(diff, '').join('\n');

export default plainFormatter;
