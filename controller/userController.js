const express = require("express");
const Users = require("../models/Users");


// *? user Data save
const saveUser = async (req, res) => {
    try {
      let UsersSave = new Users(req.body);
      await UsersSave.save();
      return res.status(200).json({
        success: "User is saved successfully",
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
    
  };

  // *? Update user by ID

const updateUser = async (req, res) => {
    try {
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).json({
          message: "user not found",
        });
      }
  
      return res.status(200).json({
        success: "user data updated successfully",
        updatedUser,
      });
    } catch (err) {
      return res.status(400).json({
        error: err.message,
      });
    }
  };

// ? Get Student

const getUser = async (req, res) => {
  try {
    const getUsers = await Users.find().exec();
    return res.status(200).json({
      success: true,
      UsersAllData: getUsers,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};


  // *? Delete user by ID
const deleteUser = async(req,res)=>{
    try{
        const UserDeleted = await Users.findByIdAndDelete(req.params.id);
        if(!UserDeleted){
            return res.status(404).json({
                message:"user is not found"
            });
        }
        return res.json({
            message:"user delete successfully",
            UserDeleted,
        });
    }catch(err){
        return res.status(400).json({
            message:"user delete unsuccessful",
            error:err
        });
    }
 };

  module.exports = {
    saveUser,
    updateUser,
    getUser,
    deleteUser
};

