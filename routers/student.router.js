const express = require("express");
const studentMG = require("../models/student.model");

const router = express.Router();

// *? student Data save
router.post("/smsBK/StudentSave", async (req, res) => {
    try {
      let studentSave = new studentMG(req.body,);
      await studentSave.save();
      return res.status(200).json({
        message: "student is saved successfully",
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  });


 //  Update student by body
 router.put("/smsBK/studentUpdate", async (req, res) => {
  try {
      // Extract the ID from the request body
      const { stId, ...updateData } = req.body;

      if (!stId) {
          return res.status(400).json({
              message: "Student stId is required",
          });
      }

      // Update the student using the stId from the body
      const updatedStudent = await studentMG.findByIdAndUpdate(
          stId,
          { $set: updateData },
          { new: true } // Return the updated document
      );

      if (!updatedStudent) {
          return res.status(404).json({
              message: "Student not found",
          });
      }

      return res.status(200).json({
          message: "Student data updated successfully",
          updatedStudent,
      });
  } catch (err) {
      return res.status(400).json({
          error: err.message,
      });
  }
});


  // *? Update student by stId  ##########################i

// router.put("/smsBK/studentUpdate/:stId", async (req, res) => {
//     try {
//       const updatedStudent = await studentMG.findByIdAndUpdate(
//         req.params.id,
//         { $set: req.body },
//         { new: true } // Return the updated document
//       );
  
//       if (!updatedStudent) {
//         return res.status(404).json({
//           message: "student not found",
//         });
//       }
  
//       return res.status(200).json({
//         message: "student data updated successfully",
//         updatedUser,
//       });
//     } catch (err) {
//       return res.status(400).json({
//         error: err.message,
//       });
//     }
//   });

// ? Get Student

router.get("/smsBK/getAllStudents", async (req, res) => {
  try {
    const getStudents = await studentMG.find().exec();
    return res.status(200).json({
      code : res.statusCode,
      message: "student data get success",
      content: getStudents,
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