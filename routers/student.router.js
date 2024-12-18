const express = require("express");
const mongoose = require("mongoose");
const studentMG = require("../models/student.model");

const router = express.Router();

// Define the attendance schema
const attendanceSchema = new mongoose.Schema({
  stId: { type: String, required: true },
  stname: { type: String, required: true },
  stEmail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the attendance model
const AttendanceModel = mongoose.model("Attendance", attendanceSchema);

// *? Save Student Data
router.post("/smsBK/StudentSave", async (req, res) => {
  try {
    const studentSave = new studentMG(req.body);
    await studentSave.save();
    return res.status(200).json({
      message: "Student saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// *? Update Student by Body
router.put("/smsBK/studentUpdate", async (req, res) => {
  try {
    const { stId, ...updateData } = req.body;

    if (!stId) {
      return res.status(400).json({
        message: "Student stId is required",
      });
    }

    const updatedStudent = await studentMG.findByIdAndUpdate(
      stId,
      { $set: updateData },
      { new: true }
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

// *? Get All Students
router.get("/smsBK/getAllStudents", async (req, res) => {
  try {
    const getStudents = await studentMG.find().exec();
    return res.status(200).json({
      code: res.statusCode,
      message: "Student data retrieved successfully",
      content: getStudents,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// *? Delete Student by ID
router.delete("/smsBK/studentDelete/:id", async (req, res) => {
  try {
    const studentDeleted = await studentMG.findByIdAndDelete(req.params.id);
    if (!studentDeleted) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    return res.status(200).json({
      message: "Student deleted successfully",
      studentDeleted,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Student deletion failed",
      error: err.message,
    });
  }
});

// *? Get Student by ID
router.get("/smsBK/getStudentById/:id", async (req, res) => {
  try {
    const student = await studentMG.findById(req.params.id).exec();

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json({
      message: "Student data retrieved successfully",
      student,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// *? Submit Attendance
router.post("/smsBK/submitAttendance", async (req, res) => {
  try {
    const { attendanceData } = req.body;

    // Check if the attendanceData array is provided and not empty
    if (!attendanceData || attendanceData.length === 0) {
      return res.status(400).json({
        message: "No attendance data provided.",
      });
    }

    // Loop through each attendance record in the array
    for (const record of attendanceData) {
      const { stId, stname, stEmail } = record;

      // Validate each record
      if (!stId || !stname || !stEmail) {
        return res.status(400).json({
          message: "Incomplete attendance data for one or more students.",
        });
      }

      // Save each attendance record
      const attendance = new AttendanceModel({ stId, stname, stEmail });
      await attendance.save();
    }

    return res.status(200).json({
      message: "Attendance submitted successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// *? Get All Attendance Records
router.get("/smsBK/getAllAttendance", async (req, res) => {
  try {
    const attendanceRecords = await AttendanceModel.find().exec();
    return res.status(200).json({
      message: "Attendance records retrieved successfully",
      attendanceRecords,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

// *? Delete Attendance by ID
router.delete("/smsBK/deleteAttendance/:id", async (req, res) => {
  try {
    const deletedAttendance = await AttendanceModel.findByIdAndDelete(req.params.id);

    if (!deletedAttendance) {
      return res.status(404).json({
        message: "Attendance record not found",
      });
    }

    return res.status(200).json({
      message: "Attendance deleted successfully",
      deletedAttendance,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

module.exports = router;
