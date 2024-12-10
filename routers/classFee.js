const express = require("express");
const {saveClassFee,updateClassFeeById,getAllClassFees,deleteClassById} = require("../controller/classFeeController");

const router = express.Router();

// *? Save Class Fee Data
router.post("/", saveClassFee);

// *? Update Class Fee by ID
router.put("/:id", updateClassFeeById);

// *? Get All Class Fees
router.get("/", getAllClassFees);

// *? Delete Class Fee by ID
router.delete("/:id", deleteClassById);

module.exports = router;
