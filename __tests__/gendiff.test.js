import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';

import parseFilesAndGenDiff from '../src/gendiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff-json', () => {
  const filepath1 = `${__dirname}/../__fixtures__/file1.json`;
  const filepath2 = `${__dirname}/../__fixtures__/file2.json`;
  const expectedPath = `${__dirname}/../__fixtures__/file1_file2_diff.txt`;
  const expected = readFileSync(expectedPath).toString();
  expect(parseFilesAndGenDiff(filepath1, filepath2)).toStrictEqual(expected);
});

test('gendiff-yaml', () => {
  const filepath1 = `${__dirname}/../__fixtures__/file1.yml`;
  const filepath2 = `${__dirname}/../__fixtures__/file2.yml`;
  const expectedPath = `${__dirname}/../__fixtures__/file1_file2_diff.txt`;
  const expected = readFileSync(expectedPath).toString();
  expect(parseFilesAndGenDiff(filepath1, filepath2)).toStrictEqual(expected);
});
