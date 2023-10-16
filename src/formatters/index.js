import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

const getFormatter = (name) => {
  switch (name) {
    case 'stylish':
      return stylishFormatter;
    case 'plain':
      return plainFormatter;
    case 'json':
      return jsonFormatter;
    default:
      throw new Error(`unknown formatter name: ${name}`);
  }
};

export default getFormatter;
