import os from "os";

export default function getOSInfo(line) {
  const flag = line.trim().split(" ")[1] ?? "";
  switch (flag) {
    case "--EOL":
      {
        const EOL = JSON.stringify(os.EOL);
        console.log(EOL);
      }
      break;
    case "--cpus":
      {
        const systemCpuCores = os.cpus();
        console.log(systemCpuCores);
      }
      break;
    case "--homedir":
      {
        const homedir = os.homedir();
        console.log(homedir);
      }
      break;
    case "--username":
      {
        const username = os.userInfo().username;
        console.log(username);
      }
      break;
    case "--architecture":
      {
        const architecture = os.arch();
        console.log(architecture);
      }
      break;
    default:
      console.log("Invalid input");
      break;
  }
}
