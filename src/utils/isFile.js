import { stat } from "fs/promises";

const isFile = async (path) => {
  try {
    const stats = await stat(path);
    return stats.isFile();
  } catch {
    return false;
  }
};

export default isFile;
