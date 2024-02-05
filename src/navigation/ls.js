import { readdir } from "node:fs/promises";

const ls = async () => {
  try {
    const files = await readdir(process.cwd(), { withFileTypes: true });

    const printFiles = files.map((item) => ({
      name: item.name,
      type: item.isDirectory() ? "directory" : "file",
    }));

    console.table(printFiles);
  } catch (err) {
    console.log("Operation failed");
  }
};

export default ls;
