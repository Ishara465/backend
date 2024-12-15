const express = require("express");
const classMg = require("../models/ClassManagement.model");

const router = express.Router();

// *? class management data save
router.post("/smsBK/classMgSave", async (req, res) => {
  try {
    let classMgSave = new classMg(req.body);
    await classMgSave.save();
    return res.status(200).json({
      message: "classes is saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});

// *? update classes
// router.put("/smsBK/classMgUpdate/:id", async (req, res) => {
//   try {
//     const updatedClass = await classMg.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     if (!updatedClass) {
//       return res.status(404).json({
//         message: "class not found",
//       });
//     }
//     return res.status(200).json({
//       message: "class data updated successfully",
//       updatedClass,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: err.message,
//     });
//   }
// });

// Update class by body
router.put("/smsBK/classMGtUpdate", async (req, res) => {
  try {
      // Extract the ID from the request body
      const { cId, ...updateData } = req.body;

      if (!cId) {
          return res.status(400).json({
              message: "class ctId is required",
          });
      }

      // Update the class using the ctId from the body
      const updatedClass = await classMg.findByIdAndUpdate(
          cId,
          { $set: updateData },
          { new: true } // Return the updated document
      );

      if (!updatedClass) {
          return res.status(404).json({
              message: "class not found",
          });
      }

      return res.status(200).json({
          message: "class data updated successfully",
          updatedClass, // Use the correct variable here
      });
  } catch (err) {
      return res.status(400).json({
          error: err.message,
      });
  }
});






//  ? Get classes
router.get("/smsBK/getAllClassMgs", async (req, res) => {
  try {
    const getClasses = await classMg.find().exec();
    return res.status(200).json({
      code: res.statusCode,
      message: "classes data get success",
      content: getClasses,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});

// ? Delete class by ID
router.delete("/smsBK/classDelete/:id", async (req, res) => {
  try {
    const classDeleted = await classMg.findByIdAndDelete(req.params.id);
    if (!classDeleted) {
      return res.status(404).json({
        message: "class not found",
      });
    }
    return res.json({
      message: "class delete successfully",
      classDeleted,
    });
  } catch (err) {
    return res.status(400).json({
      message: "class deleted unsuccessfully",
      error: err,
    });
  }
});

module.exports = router;
