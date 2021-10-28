//****************add a new note to db.json and add an id to each note****************

const express = require("express");
const path = require ("path");
const router = express.Router();
const fs = require("fs");
const dbJson = require ("../db/db.json")
const server = require("../server")
const uuid = require("uuid");
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// Gets notes saved and joins in db.json
router.get("/notes", (req, res) => {
  
readFromFile(path.join(__dirname, "../db/db.json")).then((data) => res.json(JSON.parse(data)));
});


router.post('/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a new note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;
  
  // If all the required properties are present
  if (title && text ) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid.v4(),
    };

    const response = {
      status: 'success',
      body: newNote,
    };

    readAndAppend(newNote, './db/db.json')
      
    

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting a new note');
  }
});

// This is for deleting the note
router.delete("/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const noteDelete = notes.filter((delNote) => delNote.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteDelete));
  res.json(noteDelete);
})

module.exports = router;














module.exports = router