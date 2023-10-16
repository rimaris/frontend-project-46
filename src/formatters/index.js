import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const getFormatter = (name) => {
  switch (name) {
    case 'stylish':
      return stylishFormatter;
    case 'plain':
      return plainFormatter;
    default:
      throw new Error(`unknown formatter name: ${name}`);
  }
};

export default getFormatter;
