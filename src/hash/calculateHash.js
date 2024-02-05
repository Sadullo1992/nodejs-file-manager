import { createReadStream } from "fs";
import { resolve } from "path";
import { cwd } from "process";
import { cmdLineParser, isFile, showCurrentDirectory } from "../utils/index.js";

const { createHash } = await import("crypto");

const calculateHash = async (line) => {
  const [_, ...rest] = cmdLineParser(line);
  if (rest.length > 1) throw new Error("Redundant arguments occure");

  const filePath = rest[0];
  const pathToFile = resolve(cwd(), filePath);

  const isFileExist = await isFile(pathToFile);
  if (!isFileExist) throw new Error("Invalid file path");

  const readable = createReadStream(pathToFile);
  const hash = createHash("sha256");

  readable.on("readable", () => {
    const data = readable.read();

    if (data) hash.update(data);
    else {
      console.log(hash.digest("hex"));
    }
  });
  readable.on("end", () => {
    showCurrentDirectory();
  });
};

export default calculateHash;
