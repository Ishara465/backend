const express = require("express");
const {saveUser,updateUser,getUser,deleteUser} = require("../controller/userController");
const router = express.Router();

// *? user Data save
router.post("/UsersSave", saveUser);

  // *? Update user by ID

router.put("/userUpdate/:id", updateUser);

// ? Get Student

router.get("/getAll", getUser);


  // *? Delete user by ID
 router.delete("/userDelete/:id",deleteUser);

  module.exports =router;

