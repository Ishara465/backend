const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routers
const tutorRouter = require("./routers/tutor.routers");
const studentRouter = require("./routers/student.router");
const classRouter = require("./routers/classManagement.router");
const eventRouter = require("./routers/eventMg.router");
const classFeeRouter = require("./routers/classFee.router");
const authRouter = require("./routers/loginAdmin.router"); // Add this import for login routes

const app = express();

// Middleware
app.use(express.json()); // Replaces body-parser with express.json()
app.use(cors());

// Use routes
app.use("/smsBK", authRouter);
app.use("/tutor", tutorRouter);
app.use("/student", studentRouter);
app.use("/class", classRouter);
app.use("/event", eventRouter);
app.use("/classfee", classFeeRouter);

// Connect to the DB
const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/smsDB"; // Update with your DB URL

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("smsDB is connected");
  })
  .catch((err) => console.log("smsDB connection Error", err));

app.listen(PORT, () => {
  console.log(`smsApp is running on ${PORT}`);
});
