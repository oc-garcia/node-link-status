import getArchive from "./index.js";
import fs from "fs";
import chalk from "chalk";
import { validatedList } from "./http-validation.js";

const path = process.argv;

const printList = async (validate, result, fileName = "") => {
  if (typeof result === "string") {
    console.log(chalk.red(`${result} in ${fileName}`));
    return;
  }
  if (validate) {
    console.log(chalk.yellow("Validated List"), chalk.black.bgGreen(fileName), await validatedList(result));
  } else {
    console.log(chalk.yellow("Link List"), chalk.black.bgGreen(fileName), result);
  }
};

const textProcessor = async (path) => {
  if (path.length < 3) {
    console.log(chalk.red("No path provided"));
    return;
  }

  const treatedPath = path[2];

  const validate = path[3] === "validate";

  console.log(path[3]);

  try {
    fs.lstatSync(treatedPath);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(chalk.red("Path does not exist"));
      return;
    }
  }

  if (fs.lstatSync(treatedPath).isFile()) {
    const data = await getArchive(treatedPath);
    await printList(validate, data);
  } else if (fs.lstatSync(treatedPath).isDirectory()) {
    const files = await fs.promises.readdir(treatedPath);
    await Promise.all(
      files.map(async (file) => {
        const data = await getArchive(`${treatedPath}/${file}`);
        await printList(validate, data, file);
      })
    );
  }
};

textProcessor(path);
