const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const playerSchema= new Schema({
    name:String,
    session:mongoose.Types.ObjectId
})

const player=mongoose.model("players",playerSchema);
module.exports= player;