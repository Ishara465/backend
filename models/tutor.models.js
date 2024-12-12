const mongoose = require("mongoose");

// Define the schema
const tutorSchema = new mongoose.Schema({

    _id:{
        type:Number,
        required:true
    },
    tId:{
        type:Number,
        required:true
    },

    tName: {
        type: String,
        required: true
    },
    tPhoneNumber: {
        type: String,
        required: true
    },
    tDob: {
        type: Date,
        required: true,
       
    },
    tAddress: {
        type: String,
        required: true
    },
    tNic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    tSubject: {
        type: Number,
        required: true
    },
   
});


// Pre-save hook to automatically set _id and stId to the same value
tutorSchema.pre("validate", async function (next) {
    if (this.isNew) {
      try {
        const lastTutor = await mongoose
          .model("tutor")
          .findOne({})
          .sort({ _id: -1 }); // Find the last document by _id
  
        const nextId = lastTutor ? lastTutor._id + 1 : 1; // Increment _id or start at 1
        this._id = nextId; // Set _id
        this.tId = nextId; // Set stId
      } catch (error) {
        return next(error);
      }
    }
    next();
  });


// Create the model
const tutor = mongoose.model("tutor", tutorSchema);

// Export the model
module.exports = tutor;
