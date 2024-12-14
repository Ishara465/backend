const mongoose = require("mongoose");

const classFeeSchema = new mongoose.Schema({
    sfId:{
        type: Number,
        required: true,
        auto: true
    },
    stId: {
        type: Number,
        required: true,
    },
    className: {
        type: String,
        required: true
    },
    paymentMonth: {
        type: String,
        required: true
    },
    classFee: {
        type: Number,
        required: true
    },
   
});

const ClassFeeModel = mongoose.model("ClassFee", classFeeSchema);
module.exports = ClassFeeModel;
