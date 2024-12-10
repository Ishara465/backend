const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/smsDB");
        console.log("MongoDB connected successfully!");
    } catch(err){
        console.log("MogoDB connection error: ",err);
    }
};

module.exports = connectDB;
