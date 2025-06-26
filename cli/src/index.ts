#!/usr/bin/env node

import { program } from "commander";

program
  .version("0.1.0")
  .description("SERA UI CLI")
  .option("-n, --name <type>", "Add your name")
  .action((options) => {
    console.log(`Hey, ${options.name}!`);
  });

program.parse(process.argv);
