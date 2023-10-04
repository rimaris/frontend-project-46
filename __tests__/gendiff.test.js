import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';

import { genDiff } from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff', () => {
  const filepath1 = `${__dirname}/../__fixtures__/file1.json`;
  const filepath2 = `${__dirname}/../__fixtures__/file2.json`;

  const data1 = JSON.parse(readFileSync(filepath1, 'utf-8'));
  const data2 = JSON.parse(readFileSync(filepath2, 'utf-8'));

  expect(genDiff(data1, data2)).toStrictEqual([
    '- follow: false',
    '  host: hexlet.io',
    '- proxy: 123.234.53.22',
    '- timeout: 50',
    '+ timeout: 20',
    '+ verbose: true']);
});
