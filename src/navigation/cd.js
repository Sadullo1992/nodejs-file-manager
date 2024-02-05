import { resolve } from "path";
import { chdir, cwd } from "process";
import cmdLineParser from "../utils/cmdLineParser.js";
import isDirectory from "../utils/isDirectory.js";

const cd = async (line) => {
  const [_, ...rest] = cmdLineParser(line);
  if (rest.length > 1) throw new Error("Redundant arguments occure");

  const pathToDirectory = rest[0];
  const cdDir = resolve(cwd(), pathToDirectory);

  const isDir = await isDirectory(cdDir);
  if (isDir) chdir(cdDir);
  else throw new Error("Invalid directory");
};

export default cd;
