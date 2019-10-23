const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema=new Schema({
    pin:Number,
    questions:mongoose.Types.ObjectId
})

const session = mongoose.model("sessions", sessionSchema);

module.exports= session;