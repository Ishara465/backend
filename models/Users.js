const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_role: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    nic_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    }
});


// Create the model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
