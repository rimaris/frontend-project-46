#!/usr/bin/env node

import { program } from 'commander';
import parseFilesAndGenDiff from '../src/gendiff.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <format>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(parseFilesAndGenDiff(filepath1, filepath2, options.format));
  });

program.parse();
