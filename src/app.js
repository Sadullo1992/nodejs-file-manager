import { createInterface } from "readline";
import { homedir } from "os";
import { chdir } from "process";

import { ls, cd, up } from "./navigation/index.js";
import { showCurrentDirectory, getUserName } from "./utils/index.js";
import { read, create, rename, copy, move, remove } from "./fs/index.js";
import getOSInfo from "./os/getOSInfo.js";
import calculateHash from "./hash/calculateHash.js";
import { compress, decompress } from "./zip/index.js";

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
      case "cat":
        await read(line);
        break;
      case "add":
        await create(line);
        break;
      case "rn":
        await rename(line);
        break;
      case "cp":
        await copy(line);
        break;
      case "mv":
        await move(line);
        break;
      case "rm":
        await remove(line);
        break;
      case "os":
        getOSInfo(line);
        break;
      case "hash":
        await calculateHash(line);
        break;
      case "compress":
        await compress(line);
        break;
      case "decompress":
        await decompress(line);
        break;
      case ".exit":
        rl.close();
        break;
      default:
        console.log("Invalid input");
        break;
    }
  } catch (err) {
    console.error(err);
    console.log("Operation failed");
  } finally {
    showCurrentDirectory();
    rl.prompt();
  }
};

rl.on("line", controller).on("close", close);
