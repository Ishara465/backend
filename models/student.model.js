const mongoose = require("mongoose");

const studentMGSchema = new mongoose.Schema({
   _id: {
      type: Number,
      required: true,
    },

  stId: {
    type: Number,
    required: true,
  },
  stName: {
    type: String,
    required: true,
  },
  pConNumber: {
    type: String,
    required: true,
  },
  stConNumber: {
    type: String,
    required: true,
  },
  stDOB: {
    type: Date,
    required: true,
  },
  stAddress: {
    type: String,
    required: true,
  },
  stNic: {
    type: String,
    required: true,
  },
  stEmail: {
    type: String,
    required: true,
  },
  stAge: {
    type: String,
    required: true,
  },
});

// Pre-save hook to automatically set _id and stId to the same value
studentMGSchema.pre("validate", async function (next) {
   if (this.isNew) {
     try {
       const lastStudent = await mongoose
         .model("studentMG")
         .findOne({})
         .sort({ _id: -1 }); // Find the last document by `_id`
 
       const nextId = lastStudent ? lastStudent._id + 1 : 1; // Increment `_id` or start at 1
       this._id = nextId; // Set `_id`
       this.stId = nextId; // Set `stId`
     } catch (error) {
       return next(error);
     }
   }
   next();
 });
 

const StudentModel = mongoose.model("studentMG", studentMGSchema);
module.exports = StudentModel;
