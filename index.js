import fs from "fs";
import chalk from "chalk";

const handleError = (err) => {
  throw new Error(chalk.red(err.code));
};

const getArchive = async (path) => {
  const encoding = "utf-8";
  try {
    const data = await fs.promises.readFile(path, encoding);
    console.log(chalk.green(data));
  } catch (error) {
    handleError(error);
  }
};

getArchive("./archives/text.md");
