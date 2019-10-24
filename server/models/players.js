const mongoose = require("mongoose");
let Schema = mongoose.Schema;


const playerSchema= new Schema(
  
    {
    username:String,
    session:{type:Schema.Types.ObjectId, ref:'sessions'}
}

)


const player=mongoose.model("players",playerSchema);
module.exports= player;