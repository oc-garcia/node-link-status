import axios from "axios";
import chalk from "chalk";

const extractLinks = (arrLinks) => arrLinks.map((linkObject) => Object.values(linkObject).join());

const getLinks = async (url) => {
  const response = await axios.get(url);
  return response;
};

const checkStatus = async (arrlinks) => {
  const arrStatus = await Promise.all(
    arrlinks.map(async (link) => {
      try {
        const response = await getLinks(link);
        return response.status;
      } catch (error) {
        return handleErrors(error);
      }
    })
  );
  return arrStatus;
};

const handleErrors = (error) => {
  if (error.code === "ENOTFOUND" || error.code === "ERR_BAD_REQUEST") {
    return 404;
  }
};

export const validatedList = async (linkList) => {
  const links = extractLinks(linkList);
  const status = await checkStatus(links);
  return linkList.map((linkObject, index) => ({
    ...linkObject,
    status: status[index],
  }));
};
