import path from "path";

const up = (currentDir) => {
  return path.join(currentDir, "../");
};

export default up;
