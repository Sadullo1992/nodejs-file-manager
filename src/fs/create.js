import { open } from "fs/promises";
import { resolve } from "path";
import { cwd } from "process";
import { cmdLineParser } from "../utils/index.js";

const create = async (line) => {
  const [_, ...rest] = cmdLineParser(line);
  if (rest.length > 1) throw new Error("Redundant arguments occure");

  const filePath = rest[0];
  const pathToFile = resolve(cwd(), filePath);

  let fileHandle;
  try {
    fileHandle = await open(pathToFile, "wx");
  } finally {
    await fileHandle?.close();
  }
};

export default create;
