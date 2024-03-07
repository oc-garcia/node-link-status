import fs from "fs";
import chalk from "chalk";

const getArchive = (path) => {
  const encoding = "utf-8";
  fs.readFile(path, encoding, (err, data) => {
    if (err) {
      console.error(chalk.red(err));
      return;
    }
    console.log(chalk.green(data));
  });
};

getArchive("./arquivos/texto.md");
