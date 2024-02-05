import { createBrotliCompress } from "zlib";
import { createWriteStream, createReadStream } from "fs";
import { parse, resolve } from "path";
import { cwd } from "process";
import { cmdLineParser, isDirectory, isFile } from "../utils/index.js";

const compress = async (line) => {
  const [_, ...rest] = cmdLineParser(line);
  if (rest.length !== 2)
    throw new Error("Missing or redundant argument(s) occure");

  const filePath = rest[0];
  const dest = rest[1];

  const pathToFile = resolve(cwd(), filePath);
  const pathToDestination = resolve(cwd(), dest);

  const isFileExist = await isFile(pathToFile);
  const isDestinationExist = await isDirectory(pathToDestination);
  if (!isFileExist) throw new Error("File doesn't exist");
  if (!isDestinationExist)
    throw new Error("Destination directory doesn't exist");

  const { base } = parse(pathToFile);
  const pathToDestinationFile = resolve(pathToDestination, `${base}.br`);

  const brotli = createBrotliCompress();
  const source = createReadStream(pathToFile);
  const destination = createWriteStream(pathToDestinationFile);

  source.pipe(brotli).pipe(destination);
};

export default compress;
