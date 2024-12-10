const express = require("express");
const ClassFee = require("../models/ClassFee"); // Import your ClassFee model

// *? Save Class Fee Data
const saveClassFee = async (req, res) => {
    try {
        let classFeeSave = new ClassFee(req.body); // Create a new document
        await classFeeSave.save(); // Save to DB
        return res.status(200).json({
            success: "Class fee saved successfully!",
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
};

// *? Update Class Fee by ID
const updateClassFeeById = async (req, res) => {
    try {
        const updatedClassFee = await ClassFee.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Return the updated document
        );

        if (!updatedClassFee) {
            return res.status(404).json({
                message: "Class fee not found",
            });
        }

        return res.status(200).json({
            success: "Class fee updated successfully",
            updatedClassFee,
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
};

// *? Get All Class Fees
const getAllClassFees =  async (req, res) => {
    try {
        const classFees = await ClassFee.find().exec(); // Get all class fees
        return res.status(200).json({
            success: true,
            classFeeData: classFees,
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
};

// *? Delete Class Fee by ID
const deleteClassById = async (req, res) => {
    try {
        const deletedClassFee = await ClassFee.findByIdAndDelete(req.params.id);
        if (!deletedClassFee) {
            return res.status(404).json({
                message: "Class fee not found",
            });
        }
        return res.status(200).json({
            success: "Class fee deleted successfully",
            deletedClassFee,
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = {
    saveClassFee,
    updateClassFeeById,
    getAllClassFees,
    deleteClassById
};
