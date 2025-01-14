#! /usr/bin/env ts-node
import "reflect-metadata";
import { program } from "./program";
import { generate } from "./commands/generate";

program
  .command("generate")
  .description("generate code")
  .option("-i, --input <path>", "path to the swagger file")
  .option("-o, --output <path>", "path to the output directory")
  .action(generate);

program.parse(process.argv);
