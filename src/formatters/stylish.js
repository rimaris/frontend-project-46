import {
  KEY_UNCHANGED,
  KEY_ADDED,
  KEY_DELETED,
  KEY_UPDATED,
  KEY_NESTED_DIFF,
} from '../consts.js';

const formatLine = (idents, sign, key, value) => `${idents}${sign} ${key}: ${value}\n`;

const formatValue = (val, nestingLevel) => {
  if (typeof val === 'object' && val !== null) {
    const objectKeys = Object.keys(val);
    const idents = ' '.repeat((nestingLevel + 1) * 4);
    const result = objectKeys.map((key) => `${idents}${key}: ${formatValue(val[key], nestingLevel + 1)}\n`).join('');
    const bracketIdents = ' '.repeat(nestingLevel * 4);
    return `{\n${result}${bracketIdents}}`;
  }
  return val;
};

const formatObjectDiff = (objectDiff, nestingLevel) => {
  const idents = ' '.repeat(nestingLevel * 4 + 2);
  const lines = objectDiff.map((currDiff) => {
    switch (currDiff.keyStatus) {
      case KEY_UNCHANGED:
        return formatLine(idents, ' ', currDiff.key, formatValue(currDiff.first, nestingLevel + 1));
      case KEY_ADDED:
        return formatLine(idents, '+', currDiff.key, formatValue(currDiff.second, nestingLevel + 1));
      case KEY_DELETED:
        return formatLine(idents, '-', currDiff.key, formatValue(currDiff.first, nestingLevel + 1));
      case KEY_UPDATED:
        return [
          formatLine(idents, '-', currDiff.key, formatValue(currDiff.first, nestingLevel + 1)),
          formatLine(idents, '+', currDiff.key, formatValue(currDiff.second, nestingLevel + 1)),
        ];
      case KEY_NESTED_DIFF:
        return formatLine(idents, ' ', currDiff.key, formatObjectDiff(currDiff.nestedDiff, nestingLevel + 1));
      default:
        throw new Error(`Unknown key status: ${currDiff.keyStatus}`);
    }
  });
  const result = lines.flat().join('');
  const lastIdents = ' '.repeat(nestingLevel * 4);
  return `{\n${result}${lastIdents}}`;
};

const stylishFormatter = (diff) => formatObjectDiff(diff, 0);

export default stylishFormatter;
