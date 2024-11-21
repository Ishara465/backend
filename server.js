const bodyParser = require("body-parser");//
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//import routers

const user = require('./routers/Users')

//app middleware
app.use(bodyParser.json());
app.use(cors());

//use routes
app.use(user)

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
