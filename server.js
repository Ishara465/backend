const bodyParser = require("body-parser");//
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//import routers
const tutor = require('./routers/tutor.routers')
const studentMg = require('./routers/student.router')
const classMg = require('./routers/classManagement.router')

//app middleware
app.use(bodyParser.json());
app.use(cors());

//use routes
app.use(tutor)
app.use(studentMg)
app.use(classMg);


//connect DB port and link
const PORT = 8000;
const DB_URL = "mongodb://127.0.0.1:27017/smsDB";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("smsDB is connected");
  })
  .catch((err) => console.log("smsDB connection Error", err));

app.listen(PORT, () => {
  console.log(`smsApp is running on ${PORT}`);
});
