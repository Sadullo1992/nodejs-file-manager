import { existsSync, createReadStream, createWriteStream } from "fs";
import { unlink } from 'fs/promises';
import path from "path";
import { pipeline } from "stream/promises";

const move = async (currentDir, line) => {
  const fileName = line.split(" ")[1] ?? "";
  const dest = line.split(" ")[2] ?? "";

  const filePath = path.resolve(currentDir, fileName);
  const destPath = path.resolve(currentDir, dest, fileName);

  const readable = createReadStream(filePath);
  const writable = createWriteStream(destPath);

  try {
    if (!existsSync(filePath))
      throw new Error("FS operation failed");
    await pipeline(readable, writable);
    await unlink(filePath);
  } catch (err) {
    console.log("Operation failed");
  }
};

export default move;
