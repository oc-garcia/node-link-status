import fs from "fs";
import chalk from "chalk";

const handleError = (err) => {
  throw new Error(chalk.red(err.code));
};

const getLinks = (text) => {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const links = [...text.matchAll(regex)];
  const result = links.map((link) => ({ [link[1]]: link[2] }));
  return result;
};

const getArchive = async (path) => {
  const encoding = "utf-8";
  try {
    const data = await fs.promises.readFile(path, encoding);
    return console.log(getLinks(data));
  } catch (error) {
    handleError(error);
  }
};

getArchive("./archives/text.md");
