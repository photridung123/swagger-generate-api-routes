import { program } from "../program";

export const requireArg = <T extends Record<string, any>>(
  options: T,
  name: (keyof T)[]
) => {
  const missing = name.filter((n) => !options[n]);
  if (missing.length) {
    console.error(`Missing --${missing.join(", --")}`);
    program.outputHelp();
    process.exit(0);
  }

  // return verified names, non-nullable
  return name.reduce((acc, n) => {
    acc[n] = options[n]!;
    return acc;
  }, {} as Record<keyof T, NonNullable<T[keyof T]>>);
};
