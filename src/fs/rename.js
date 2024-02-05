import fs from "fs/promises";
import { resolve } from "path";
import { cwd } from "process";
import { cmdLineParser, isExist } from "../utils/index.js";

const rename = async (line) => {
  const [_, ...rest] = cmdLineParser(line);
  if (rest.length !== 2)
    throw new Error("Missing or redundant argument(s) occure");

  const oldFilePath = rest[0];
  const newFilePath = rest[1];

  const pathToOldFile = resolve(cwd(), oldFilePath);
  const pathToNewFile = resolve(cwd(), newFilePath);

  const isExistOldFile = await isExist(pathToOldFile);
  const isExistNewFile = await isExist(pathToNewFile);

  if (!isExistOldFile || isExistNewFile) throw new Error("fs operation failed");
  else await fs.rename(pathToOldFile, pathToNewFile);
};

export default rename;
