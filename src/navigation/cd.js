import path from "path";
import fs from "fs";

const cd = (currentDir, line) => {
  const pathToDirectory = line.split(" ")[1] ?? '';
  const cdDir = path.resolve(currentDir, pathToDirectory);
  
  if (fs.existsSync(cdDir)) {
    return cdDir;
  }
  console.log("Operation failed");
  return currentDir;
};

export default cd;
