const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require ("path");
const uuid = require("uuid");
const htmlRoutes = require('./routes/htmlroutes')
const apiroutes = require('./routes/apiroutes')

const app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public')); 

app.use('/api', apiroutes)
app.use('/', htmlRoutes)


app.listen(PORT, function(){
  console.log("App is listening with PORT" + PORT);
})
 