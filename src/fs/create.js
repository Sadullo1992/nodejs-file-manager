import fs from "fs/promises";
import path from "path";

const create = async (currentDir, line) => {
  const fileName = line.split(" ")[1] ?? "";
  const pathToFile = path.resolve(currentDir, fileName);

   try {
     await fs.open(pathToFile, 'wx');
   } catch (err) {
     console.log('Operation failed')
   }
};

export default create;
