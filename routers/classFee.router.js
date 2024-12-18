const express = require("express");
const classFee = require("../models/classFee.model");

const router = express.Router();

// *? Get All Class Fees
router.get("/smsBK/getAllClassFee", async (req, res) => { 
    try {
        const getClassFees = await classFee.find().exec();
        return res.status(200).json({
        code: res.statusCode,
        message: "Class fee data retrieved successfully",
        content: getClassFees,
        });
    } catch (err) {
        return res.status(400).json({
        code:res.statusCode,
        error: err.message,
        });
    }
});

// *? Save Class Fee Data
router.post("/smsBK/classFeeSave", async (req, res) => {
  try {
    let classFeeSave = new classFee(req.body);
    await classFeeSave.save();
    return res.status(200).json({
      code:res.statusCode,
      message: "Class fee data saved successfully",
      content:classFeeSave,
    });
  } catch (err) {
    return res.status(400).json({
      code:res.statusCode,
      error: err.message,
    });
  }
});

// *? Update Class Fee by ID
// router.put("/classFee/:id", async (req, res) => {
//   try {
//     const updatedClassFee = await classFee.findOneAndUpdate(
//       {sfId:req.params.id},
//       { $set: req.body },
//       { new: true }
//     );
//     if (!updatedClassFee) {
//       return res.status(404).json({
//         message: "Class fee not found",
//       });
//     }
//     return res.status(200).json({
//       message: "Class fee data updated successfully",
//       updatedClassFee,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: err.message,
//     });
//   }
// });

//  Update classFee by body
router.put("/smsBK/classFeeUpdate", async (req, res) => {
    try {
        // Extract the ID from the request body
        const { cfId, ...updateData } = req.body;
  
        if (!cfId) {
            return res.status(400).json({
                code:res.statusCode,
                message: "class cfId is required",
            });
        }
  
        // Update the student using the stId from the body
        const updatedClasses = await classFee.findByIdAndUpdate(
            cfId,
            { $set: updateData },
            { new: true } // Return the updated document
        );
  
        if (!updatedClasses) {
            return res.status(404).json({
                code:res.statusCode,
                message: "class not found",
            });
        }
  
        return res.status(200).json({
            code: res.statusCode,
            message: "class data updated successfully",
            content:updatedClasses
        });
    } catch (err) {
        return res.status(400).json({
            code:res.statusCode,
            error: err.message,
        });
    }
  });

// *? Delete Class Fee by ID
router.delete("/smsBK/classFeeDelete/:id", async (req, res) => {
  try {
    const classFeeDeleted = await classFee.findOneAndDelete({cfId:req.params.id});
    if (!classFeeDeleted) {
      return res.status(404).json({
        code:res.statusCode,
        message: "Class fee not found",
      });
    }
    return res.status(200).json({
      code:res.statusCode,
      message: "Class fee deleted successfully",
      content:classFeeDeleted
    });
  } catch (err) {
    return res.status(400).json({
      code:res.statusCode,
      message: "Class fee deletion unsuccessful",
      error: err.message,
    });
  }
});

module.exports = router;
