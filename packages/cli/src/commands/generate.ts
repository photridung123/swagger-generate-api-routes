/* eslint-disable @typescript-eslint/no-var-requires */
import path from "path";
import { requireArg } from "../utils";
import { generateService } from "../generator";

interface GenerateOptions {
  output: string;
}

export const generate = async (options: GenerateOptions) => {
  requireArg(options, ["output"]);
  const output = path.resolve(process.cwd(), options.output);

  const outputService = output + "/services";

  if (!require("fs").existsSync(outputService)) {
    require("fs").mkdirSync(outputService, { recursive: true });
  }

  await generateService({ output: outputService });
};
