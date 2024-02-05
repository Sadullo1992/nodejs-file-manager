import { createInterface } from "readline";
import { homedir } from "os";
import { chdir } from "process";

import { ls, cd, up } from "./navigation/index.js";
import showCurrentDirectory from "./utils/showCurrentDirectory.js";
import { read, create, rename, copy, move, remove } from "./fs/index.js";
import getOSInfo from "./os/getOSInfo.js";
import calculateHash from "./hash/calculateHash.js";
import { compress, decompress } from "./zip/index.js";
import getUserName from "./utils/getUserName.js";

const HOME_DIR = homedir();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

const start = () => {
  const userName = getUserName();
  console.log(`Welcome to the File Manager, ${userName}!`);
  chdir(HOME_DIR);
  showCurrentDirectory();
  rl.prompt();
};
start();

const close = () => {
  const userName = getUserName();
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
};

const controller = async (line) => {
  const cmd = line.trim().split(" ")[0];
  try {
    switch (cmd) {
      case "up":
        up(line);
        break;
      case "ls":
        await ls();
        break;
      case "cd":
        await cd(line);
        break;
      // case "cat":
      //   await read(state.currentDir, line);
      //   break;
      // case "add":
      //   await create(state.currentDir, line);
      //   break;
      // case "rn":
      //   await rename(state.currentDir, line);
      //   break;
      // case "cp":
      //   await copy(state.currentDir, line);
      //   break;
      // case "mv":
      //   await move(state.currentDir, line);
      //   break;
      // case "rm":
      //   await remove(state.currentDir, line);
      //   break;
      // case "os":
      //   getOSInfo(line);
      //   break;
      // case "hash":
      //   await calculateHash(state.currentDir, line);
      //   break;
      // case "hash":
      //   await calculateHash(state.currentDir, line);
      //   break;
      // case "compress":
      //   await compress(state.currentDir, line);
      //   break;
      // case "decompress":
      //   await decompress(state.currentDir, line);
      //   break;
      case ".exit":
        rl.close();
        break;
      default:
        console.log("Invalid input");
        break;
    }
  } catch (err) {
    console.log("Operation failed");
  } finally {
    showCurrentDirectory();
    rl.prompt();
  }
};

rl.on("line", controller).on("close", close);
