const fs = require('fs');
const util = require('util');
const dbJson = require ("../db/db.json")

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} dbJson The file you want to write to.
 *  @param {object} newNote The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (dbJson, newNote) =>
  fs.writeFile(dbJson, JSON.stringify(newNote, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${dbJson}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} newNote The content you want to append to the file.
 *  @param {string} dbJson The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (newNote, dbJson) => {
  fs.readFile(dbJson, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(newNote);
      writeToFile(dbJson, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend };
