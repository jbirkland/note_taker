const express = require("express");
const path = require ("path");
const router = express.Router();


router.get("/notes", function (req, res){
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get('*', function (req, res){
  console.log(path.join(__dirname, "/public/index.html"))
  console.log('hello world')
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router