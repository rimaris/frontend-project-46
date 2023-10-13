import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { genDiffStr } from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff-json', () => {
  const filepath1 = `${__dirname}/../__fixtures__/file1.json`;
  const filepath2 = `${__dirname}/../__fixtures__/file2.json`;
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiffStr(filepath1, filepath2)).toStrictEqual(expected);
});

test('gendiff-yaml', () => {
  const filepath1 = `${__dirname}/../__fixtures__/file1.yml`;
  const filepath2 = `${__dirname}/../__fixtures__/file2.yml`;
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(genDiffStr(filepath1, filepath2)).toStrictEqual(expected);
});
