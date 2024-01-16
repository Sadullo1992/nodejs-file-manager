import { createInterface } from "readline";
import { homedir } from "os";

import { ls, cd, up } from "./navigation/index.js";
import showCurrentDirectory from "./utils/showCurrentDirectory.js";

const HOME_DIR = homedir();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

const getUserName = () => {
  const userName = process.argv.slice(2)[0].replace("--username=", "");
  return userName;
};

const start = () => {
  const userName = getUserName();
  console.log(`Welcome to the File Manager, ${userName}!`);
  showCurrentDirectory(HOME_DIR);
  rl.prompt();
};
start();

const close = () => {
  const userName = getUserName();
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
};

const state = {
  currentDir: HOME_DIR,
};

const controller = async (line) => {
  try {
    switch (line.trim().split(" ")[0]) {
      case "up":
        {
          const upperDir = up(state.currentDir);
          state.currentDir = upperDir;
        }
        break;
      case "ls":
        await ls(state.currentDir);
        break;
      case "cd":
        {
          const cdDir = cd(state.currentDir, line);
          state.currentDir = cdDir;
        }
        break;
      case ".exit":
        rl.close();
        break;
      default:
        console.log("Invalid input");
        break;
    }
  } catch (err) {
    console.log(err);
  } finally {
    showCurrentDirectory(state.currentDir);
    rl.prompt();
  }
};

rl.on("line", controller).on("close", close);
