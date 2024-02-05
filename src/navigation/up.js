import { join } from "path";
import { cwd, chdir } from "process";

const up = (line) => {
  const [_, ...rest] = line.split(" ");
  if (rest.length > 0) throw new Error("failed");
  chdir(join(cwd(), "../"));
};

export default up;
