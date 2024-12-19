const express = require("express");
const classFee = require("../models/Classfee.js");

const router = express.Router();

// *? Get All Class Fees
router.get("/classFee", async (req, res) => { 
    try {
        const getClassFees = await classFee.find().exec();
        return res.status(200).json({
        code: res.statusCode,
        message: "Class fee data retrieved successfully",
        content: getClassFees,
        });
    } catch (err) {
        return res.status(400).json({
        error: err.message,
        });
    }
});

// *? Save Class Fee Data
router.post("/classFee", async (req, res) => {
  try {
    let classFeeSave = new classFee(req.body);
    await classFeeSave.save();
    return res.status(200).json({
      message: "Class fee data saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// *? Update Class fee by ID
router.put("/classFee/:id", async (req, res) => {
  try {
    const updatedClassFee = await classFee.findOneAndUpdate(
      {sfId:req.params.id},
      { $set: req.body },
      { new: true }
    );
    if (!updatedClassFee) {
      return res.status(404).json({
        message: "Class fee not found",
      });
    }
    return res.status(200).json({
      message: "Class fee data updated successfully",
      updatedClassFee,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// *? Delete Class Fee by ID
router.delete("/classFee/:id", async (req, res) => {
  try {
    const classFeeDeleted = await classFee.findOneAndDelete({sfId:req.params.id});
    if (!classFeeDeleted) {
      return res.status(404).json({
        message: "Class fee not found",
      });
    }
    return res.json({
      message: "Class fee deleted successfully",
      classFeeDeleted,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Class fee deletion unsuccessful",
      error: err.message,
    });
  }
});

module.exports = router;
