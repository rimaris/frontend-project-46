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
    let result = '';
    const objectKeys = Object.keys(val).sort();
    const idents = ' '.repeat((nestingLevel + 1) * 4);
    for (let i = 0; i < objectKeys.length; i += 1) {
      const key = objectKeys[i];
      result += `${idents}${key}: ${formatValue(val[key], nestingLevel + 1)}\n`;
    }
    const bracketIdents = ' '.repeat(nestingLevel * 4);
    return `{\n${result}${bracketIdents}}`;
  }
  return val;
};

const formatObjectDiff = (objectDiff, nestingLevel) => {
  let result = '';
  const idents = ' '.repeat(nestingLevel * 4 + 2);
  for (let i = 0; i < objectDiff.length; i += 1) {
    const currDiff = objectDiff[i];
    switch (currDiff.keyStatus) {
      case KEY_UNCHANGED:
        result += formatLine(idents, ' ', currDiff.key, formatValue(currDiff.first, nestingLevel + 1));
        break;
      case KEY_ADDED:
        result += formatLine(idents, '+', currDiff.key, formatValue(currDiff.second, nestingLevel + 1));
        break;
      case KEY_DELETED:
        result += formatLine(idents, '-', currDiff.key, formatValue(currDiff.first, nestingLevel + 1));
        break;
      case KEY_UPDATED:
        result += formatLine(idents, '-', currDiff.key, formatValue(currDiff.first, nestingLevel + 1));
        result += formatLine(idents, '+', currDiff.key, formatValue(currDiff.second, nestingLevel + 1));
        break;
      case KEY_NESTED_DIFF:
        result += formatLine(idents, ' ', currDiff.key, formatObjectDiff(currDiff.nestedDiff, nestingLevel + 1));
        break;
      default:
        throw new Error(`Unknown key status: ${currDiff.keyStatus}`);
    }
  }
  const lastIdents = ' '.repeat(nestingLevel * 4);
  return `{\n${result}${lastIdents}}`;
};

const stylishFormatter = (diff) => formatObjectDiff(diff, 0);

export default stylishFormatter;
