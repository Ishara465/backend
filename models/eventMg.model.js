const mongoose = require("mongoose");

const eventMgSchema = new mongoose.Schema({

  _id:{
    type:String,
    required:true
  },
  eId:{
    type:String,
    required:true
  },

  title: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

eventMgSchema.pre("validate",async function(next){
  if(this.isNew){
      try{
          const lastEvent = await mongoose
              .model("eventMg")
              .findOne({})
              .sort({_id:-1})

          const nextId =lastEvent ? lastEvent._id +1:1;
          this._id = nextId;
          this.eId = nextId;
      }catch(err){
          return next(err)
      }
  }
  next();
})


const eventMgModel = mongoose.model("eventMg", eventMgSchema);
module.exports = eventMgModel;
