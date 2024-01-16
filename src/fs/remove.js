import { existsSync } from "fs";
import { unlink } from "fs/promises";
import path from "path";

const remove = async (currentDir, line) => {
  const fileName = line.split(" ")[1] ?? "";

  const filePath = path.resolve(currentDir, fileName);

  try {
    if (!existsSync(filePath)) throw new Error("FS operation failed");
    await unlink(filePath);
  } catch (err) {
    console.log("Operation failed");
  }
};

export default remove;
