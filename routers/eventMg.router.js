const express = require("express");
const eventMg = require("../models/eventMg.model");

const router = express.Router();

// ? event mg data save
router.post("/smsBK/eventMgSave", async (req, res) => {
  try {
    let eventSave = new eventMg(req.body);
    await eventSave.save();
    return res.status(200).json({
      message: "event is saved successfully",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});

// ? eventMg update
// router.put("/smsBK/eventMgUpdate/:id", async (req, res) => {
//   try {
//     const eventUpdate = await eventMg.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     if (!eventUpdate) {
//       return res.status(404).json({
//         message: "event not found",
//       });
//     }
//     return res.status(200).json({
//       message: "event data updated successfully",
//       eventUpdate,
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: err.message,
//     });
//   }
// });
//  Update student by body
router.put("/smsBK/eventUpdate", async (req, res) => {
  try {
      // Extract the ID from the request body
      const { eId, ...updateData } = req.body;

      if (!eId) {
          return res.status(400).json({
              message: "Event eId is required",
          });
      }

      // Update the student using the stId from the body
      const updatedEvent = await eventMg.findByIdAndUpdate(
          eId,
          { $set: updateData },
          { new: true } // Return the updated document
      );

      if (!updatedEvent) {
          return res.status(404).json({
              message: "Event not found",
          });
      }

      return res.status(200).json({
          message: "Event data updated successfully",
          updatedEvent,
      });
  } catch (err) {
      return res.status(400).json({
          error: err.message,
      });
  }
});


//  ? Get All events
router.get("/smsBK/getAllEvents", async (req, res) => {
  try {
    const getAllEvents = await eventMg.find().exec();
    return res.status(200).json({
      code: res.statusCode,
      message: "event data get success",
      content: getAllEvents,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
});

// ? Delete event by ID
router.delete("/smsBK/eventDelete/:id", async (req, res) => {
  try {
    const eventDelete = await eventMg.findByIdAndDelete(req.params.id);
    if (!eventDelete) {
      return res.status(404).json({
        message: "event not found",
      });
    }
    return res.json({
      message: "event delete successfully",
      eventDelete,
    });
  } catch (err) {
    return res.status(400).json({
      message: "event deleted unsuccessfully",
      error: err,
    });
  }
});

module.exports = router;
