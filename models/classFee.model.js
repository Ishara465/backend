const mongoose = require("mongoose");

const classFeeSchema = new mongoose.Schema({
    _id:{
        type: Number,
        required: true,
    },

    cfId:{
        type: Number,
        required: true,
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
// Pre-save hook to automatically set _id and stId to the same value
classFeeSchema.pre("validate", async function (next) {
   if (this.isNew) {
     try {
       const lastClassFee = await mongoose
         .model("ClassFee")
         .findOne({})
         .sort({ _id: -1 }); // Find the last document by `_id`
 
       const nextId = lastClassFee ? lastClassFee._id + 1 : 1; // Increment `_id` or start at 1
       this._id = nextId; // Set `_id`
       this.cfId = nextId; // Set `stId`
     } catch (error) {
       return next(error);
     }
   }
   next();
 });



const ClassFeeModel = mongoose.model("ClassFee", classFeeSchema);
module.exports = ClassFeeModel;
