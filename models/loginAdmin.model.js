const mongoose = require("mongoose");

const loginAdminSchema = new mongoose.Schema({
  EmailId: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  LicenseNo: {
    type: String,
    required: true,
  },
});

const loginAdminModel = mongoose.model("loginAdmin", loginAdminSchema);

module.exports = loginAdminModel;
