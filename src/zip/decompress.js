import zlib from "zlib";
import { createWriteStream, createReadStream } from "fs";
import path from "path";

const decompress = async (currentDir, line) => {
  const fileName = line.split(" ")[1] ?? "";
  const fileNameDestination = line.split(" ")[2] ?? "";

  const pathToFile = path.resolve(currentDir, fileName);
  const pathToDestination = path.resolve(currentDir, fileNameDestination);

  const brotli = zlib.createBrotliDecompress();
  const source = createReadStream(pathToFile);
  const destination = createWriteStream(pathToDestination);

  source.pipe(brotli).pipe(destination);
};

export default decompress;
