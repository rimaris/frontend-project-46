#!/usr/bin/env node

import { program } from 'commander';
import parseFilesAndGenDiff from '../src/gendiff.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format', 'output format')
  .action((filepath1, filepath2) => {
    console.log(parseFilesAndGenDiff(filepath1, filepath2));
  });

program.parse();
