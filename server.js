const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");



const app = express();

// Import routers
const tutor = require('./routers/tutor.routers');
const studentMg = require('./routers/student.router');
const classMg = require('./routers/classManagement.router');
const eventMg = require('./routers/eventMg.router');
const classFee = require('./routers/classFee.router');
const authRouter = require('./routers/loginAdmin.router'); // Import login/signup router

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use(tutor);
app.use(studentMg);
app.use(classMg);
app.use(eventMg);
app.use(classFee);
app.use("/smsBK", authRouter); // Add the login/signup router

// Connect to the DB
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
