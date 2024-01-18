import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const { createHash } = await import("crypto");

const calculateHash = async (currentDir, line) => {
  const fileName = line.split(" ")[1] ?? "";
  const pathToFile = path.resolve(currentDir, fileName);

  const hash = createHash("sha256");

  hash.on("readable", () => {
    const data = hash.read();
    if (data) {
      console.log(data.toString("hex"));
    }
  });

  try {
    if (!existsSync(pathToFile)) throw new Error("FS operation failed");

    const content = await fs.readFile(pathToFile, {
      encoding: "utf8",
    });

    hash.write(content);
  } catch (err) {
    console.log("Operation failed");
  }

  hash.end();
};

export default calculateHash;
