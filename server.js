const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require ("path");
const uuid = require("uuid");

const app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(public)); 



// Gets notes saved and joins in db.json
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db.db.json"))
});

// Adds new notes to db.json
app.post("./api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const addNote = req.body;
  addNote.id = uuid.v4();
  notes.push(addNote);
  fs.writeFileSync(".db.db.json", JSON.stringify(notes))
  res.json(notes);
})

// This is for deleting the note
app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"));
  const noteDelete = notes.filter((delNote) => delNote.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteDelete));
  res.json(noteDelete);
})

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res){
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.listen(PORT, function(){
  console.log("App is listening with PORT" + PORT);
})
 