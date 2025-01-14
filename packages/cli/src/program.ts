import { Command } from "commander";
import { version } from "../package.json";

export const program = new Command();

program.version(version, "-v, --version", "output the current version");
program.showHelpAfterError();
