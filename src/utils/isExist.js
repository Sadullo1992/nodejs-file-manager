import { access } from "fs/promises";

const isExist = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

export default isExist;
