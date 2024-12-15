const express = require("express");
const tutor = require("../models/tutor.models");

const router = express.Router();

// *? user Data save
router.post("/smsBK/tutorSave", async (req, res) => {
    try {
      let tutorSave = new tutor(req.body);
      await tutorSave.save();
      return res.status(200).json({
        message: "tutor is saved successfully",
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  });

  // *? Update user by ID

// router.put("/smsBK/tutorUpdate/:id", async (req, res) => {
//     try {
//       const updatedTutor = await tutor.findByIdAndUpdate(
//         req.params.id,
//         { $set: req.body },
//         { new: true } // Return the updated document
//       );
  
//       if (!updatedTutor) {
//         return res.status(404).json({
//           message: "tutor not found",
//         });
//       }
  
//       return res.status(200).json({
//         success: "tutor data updated successfully",
//         updatedTutor,
//       });
//     } catch (err) {
//       return res.status(400).json({
//         error: err.message,
//       });
//     }
//   });

//  Update student by body
router.put("/smsBK/tutorUpdate", async (req, res) => {
  try {
      // Extract the ID from the request body
      const { tId, ...updateData } = req.body;

      if (!tId) {
          return res.status(400).json({
              message: "Tutor tId is required",
          });
      }

      // Update the student using the stId from the body
      const updatedTutor = await tutor.findByIdAndUpdate(
          tId,
          { $set: updateData },
          { new: true } // Return the updated document
      );

      if (!updatedTutor) {
          return res.status(404).json({
              message: "tutor not found",
          });
      }

      return res.status(200).json({
          message: "tutor data updated successfully",
          updatedTutor,
      });
  } catch (err) {
      return res.status(400).json({
          error: err.message,
      });
  }
});


// ? Get Tutor

router.get("/smsBK/getAllTutors", async (req, res) => {
  try {
    const getTutors = await tutor.find().exec();
    return res.status(200).json({
      code : res.statusCode,
      message: "tutor data get success",
      content: getTutors,

    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});


  // *? Delete tutor by ID
 router.delete("/smsBK/tutorDelete/:id",async(req,res)=>{
    try{
        const tutorDeleted = await tutor.findByIdAndDelete(req.params.id);
        if(!tutorDeleted){
            return res.status(404).json({
                message:"tutor is not found"
            });
        }
        return res.json({
            message:"tutor delete successfully",
            tutorDeleted,
        });
    }catch(err){
        return res.status(400).json({
            message:"tutor delete unsuccessful",
            error:err
        });
    }
 });

  module.exports =router;