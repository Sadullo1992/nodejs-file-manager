import { createReadStream } from "fs";
import path from "path";

const read = async (currentDir, line) => {
  const fileName = line.split(" ")[1] ?? "";
  const pathToFile = path.resolve(currentDir, fileName);
  const readableStream = createReadStream(pathToFile);

  readableStream.on("data", (chunk) => {
    console.log("\n" + chunk.toString());
  });
  readableStream.on('error', () => {
    console.log('Operation failed');
  })
};

export default read;
