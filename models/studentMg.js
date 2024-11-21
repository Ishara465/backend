const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Import Schema

const studentMGSchema = new mongoose.Schema({
   userId: {
      type: Schema.Types.ObjectId, // Reference to the User model
      ref: 'User',
      required: true,
   },
   parent_contact_number: {
      type: Number,
      required: true,
   },
   student_contact_number: {
      type: Number,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
});

const StudentModel = mongoose.model("studentMG", studentMGSchema);
module.exports = StudentModel;
