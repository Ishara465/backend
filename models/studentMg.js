const mongoose = require("mongoose");


const studentMGSchema = new mongoose.Schema({
    stName:{
        type:String,
        required:true
    },
    pContactNum:{
        type:String,
        required:true
    },
    stContactNum:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    stAddress:{
        type:String,
        required:true
    },
    stNic:{
        type:String,
        required:true
    },
    stEmail:{
        type:String,
        required:true
    },
    stAge:{
        type:Number,
        required:true
    }
    
})


const StudentModel = mongoose.model("studentMG",studentMGSchema)
module.exports =StudentModel;