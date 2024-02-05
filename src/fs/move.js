import { createReadStream, createWriteStream } from "fs";
import { rm } from "fs/promises";
import { resolve } from "path";
import { cwd } from "process";
import { pipeline } from "stream/promises";
import { cmdLineParser, isFile } from "../utils/index.js";

const move = async (line) => {
  const [_, ...rest] = cmdLineParser(line);
  if (rest.length !== 2)
    throw new Error("Missing or redundant argument(s) occure");

  const filePath = rest[0];
  const dest = rest[1];

  const fileToPath = resolve(cwd(), filePath);
  const destToPath = resolve(cwd(), dest, filePath);

  const isFileExist = await isFile(fileToPath);
  if (!isFileExist) throw new Error("File doesn't exist");

  const readable = createReadStream(fileToPath);
  const writable = createWriteStream(destToPath);
  await pipeline(readable, writable);
  await rm(fileToPath);
};

export default move;
