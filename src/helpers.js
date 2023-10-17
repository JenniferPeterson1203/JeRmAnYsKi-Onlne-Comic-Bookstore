//import the readFileSync and writeFileSync functions that comes with fs
const { readFileSync, writeFileSync } = require("fs");

//readJSONFile function
function readJSONFile(path, fileName) {
  const collection = readFileSync(`${path}/${fileName}`, "utf8");
  return collection ? JSON.parse(collection) : [];
}

//writeJSONFile function
function writeJSONFile(path, fileName, data) {
  data = JSON.stringify(data);
  return writeFileSync(`${path}/${fileName}`, data, { encoding: "utf-8" });
}

//export the functions to be able to use in other files
module.exports = {
  readJSONFile,
  writeJSONFile,
};
