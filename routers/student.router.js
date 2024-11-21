const express = require("express");
const studentMG = require("../models/student.model");

const router = express.Router();

// *? student Data save
router.post("/smsBK/StudentSave", async (req, res) => {
    try {
      let studentSave = new studentMG(req.body);
      await studentSave.save();
      return res.status(200).json({
        success: "student is saved successfully",
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
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

router.get("/smsBK/getAllStudents", async (req, res) => {
  try {
    const getStudents = await studentMG.find().exec();
    return res.status(200).json({
      success: true,
      studentAllData: getStudents,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
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