const express = require("express");
const studentMG = require("../models/studentMg");
const User = require('../models/Users');  // Adjust the path as needed


const router = express.Router();

// *? student Data save
// router.post("/smsBK/StudentSave", async (req, res) => {
//     try {
//       let studentSave = new studentMG(req.body);
//       await studentSave.save();
//       return res.status(200).json({
//         success: "User is saved successfully",
//       });
//     } catch (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//   });

// *? Save student data
router.post("/smsBK/StudentSave", async (req, res) => {
  try {
    const { userId, user_name, user_role, dob, nic_number, email, age, contact_number, parent_contact_number, student_contact_number, address } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ userId });
    if (!userExists) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    // Create and save the student data
    const studentSave = new studentMG({
      userId: userExists._id,  // Ensure userId is stored as an ObjectId referencing User model
      user_name,
      user_role,
      dob,
      nic_number,
      email,
      age,
      contact_number,
      parent_contact_number,
      student_contact_number,
      address,
    });

    await studentSave.save();
    return res.status(200).json({
      success: "User is saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});


  // *? Update student by ID

router.put("/smsBK/studentUpdate/:id", async (req, res) => {
    try {
      const updatedStudent = await studentMG.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // Return the updated document
      );
  
      if (!updatedStudent) {
        return res.status(404).json({
          message: "student not found",
        });
      }
  
      return res.status(200).json({
        success: "student data updated successfully",
        updatedUser,
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  });

// ? Get Student

// router.get("/smsBK/getAllStudents", async (req, res) => {
//   try {
//     const getStudents = await studentMG.find().exec();
//     return res.status(200).json({
//       success: true,
//       studentAllData: getStudents,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: err,
//     });
//   }
// });
// *? Get All Students
router.get('/getAllStudents', async (req, res) => {
  try {
    const students = await studentMG.find()
      .populate('userID', 'user_name email contact_number user_role birthday nic_number age'); // Fields to include from User
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching students' });
  }
});








  // *? Delete user by ID
 router.delete("/smsBK/studentDelete/:id",async(req,res)=>{
    try{
        const studentDeleted = await studentMG.findByIdAndDelete(req.params.id);
        if(!studentDeleted){
            return res.status(404).json({
                message:"student is not found"
            });
        }
        return res.json({
            message:"student delete successfully",
            studentDeleted,
        });
    }catch(err){
        return res.status(400).json({
            message:"student delete unsuccessful",
            error:err
        });
    }
 });

  module.exports =router;