import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const rename = async (currentDir, line) => {
  const oldFileName = line.split(" ")[1] ?? "";
  const newFileName = line.split(" ")[2] ?? "";

  const pathToOldFile = path.resolve(currentDir, oldFileName);
  const pathToNewFile = path.resolve(currentDir, newFileName);

  try {
    if (!existsSync(pathToOldFile) || existsSync(pathToNewFile))
      throw new Error("FS operation failed");
    await fs.rename(pathToOldFile, pathToNewFile);
  } catch (err) {
    console.log("Operation failed");
  }
};

export default rename;
