import getArchive from "./index.js";
import fs from "fs";
import chalk from "chalk";

const path = process.argv;

const printList = (result, fileName) => {
  if (fileName) {
    console.log(chalk.blue(`Links in ${fileName}`), result);
  } else {
    console.log(chalk.yellow("link List:"), result);
  }
};

const textProcessor = async (path) => {
  if (path.length < 3) {
    console.log(chalk.red("No path provided"));
    return;
  }

  const treatedPath = path[2];

  if (fs.lstatSync(treatedPath).isFile()) {
    const data = await getArchive(treatedPath);
    printList(data);
  } else if (fs.lstatSync(treatedPath).isDirectory()) {
    const files = await fs.promises.readdir(treatedPath);
    files.forEach(async (file) => {
      const data = await getArchive(`${treatedPath}/${file}`);
      printList(data, file);
    });
  }
};

textProcessor(path);
