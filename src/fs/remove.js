import { rm } from "fs/promises";
import { resolve } from "path";
import { cwd } from "process";
import { cmdLineParser, isFile } from "../utils/index.js";

const remove = async (line) => {
  const [_, ...rest] = cmdLineParser(line);
  if (rest.length > 1) throw new Error("Redundant arguments occure");

  const filePath = rest[0];
  const pathToFile = resolve(cwd(), filePath);

  const isFileExist = await isFile(pathToFile);
  if (!isFileExist) throw new Error("Invalid file path");
  await rm(pathToFile);
};

export default remove;
