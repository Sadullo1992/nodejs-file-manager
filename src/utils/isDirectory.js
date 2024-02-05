import { stat } from "fs/promises";

const isDirectory = async (path) => {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
};

export default isDirectory;
