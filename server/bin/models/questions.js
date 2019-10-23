const mongoose= require("mongoose");
const Schema = mongoose.Schema;


const questionSchema= new Schema({
    questions=Array
})
const question= mongoose.model("questions",questionSchema);

module.exports=question