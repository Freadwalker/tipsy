const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const answerSchema = new Schema ({
    answer:String,
    votes:Number,
    answeredBy:mongoose.Types.ObjectId,
    answerTo:mongoose.Types.ObjectId,
    votedBy:mongoose.Types.ObjectId
})
const answer = mongoose.model("answers",answerSchema);

module.exports=answer;