import fs from "fs";
import chalk from "chalk";

const handleError = (err) => {
  throw new Error(chalk.red(err.code));
};

const getArchive = (path) => {
  const encoding = "utf-8";
  fs.promises
    .readFile(path, encoding)
    .then((data) => console.log(chalk.green(data)))
    .catch(handleError);
};

// const getArchive = async (path) => {
//   const encoding = "utf-8";
//   await fs.readFile(path, encoding, (err, data) => {
//     if (err) {
//       handleError(err);
//     }
//     console.log(chalk.green(data));
//   });
// };

getArchive("./archives/text.md");
