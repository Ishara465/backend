const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const connectDB = require('./config/database');

// Import routers
const userRoutes = require("./routers/Users");
const classFeeRoutes = require("./routers/classFee"); // Add your classFee routes here

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use("/api/v1/users", userRoutes);        // User routes
app.use("/api/v1/classFee", classFeeRoutes);    // Class fee routes

// Connect DB
const PORT = 3001;
// const DB_URL = "mongodb://127.0.0.1:27017/smsDB";

const start = async () => {
  try{
    await connectDB()
    app.listen(PORT,() => {
      console.log(`Server is listening on port ${PORT}...`)
    })
  } catch(err){
    console.log(err);
  }
};

start();

