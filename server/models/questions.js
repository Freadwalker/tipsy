const mongoose= require("mongoose");
const Schema = mongoose.Schema;

let questions=[
"When everything else fails I can always masturbate to______",
"The worst life decision one could make?",
"Hey Baby come back to my place and I show you______",
"What brought the Orgy to a grinding halt?",
"I drink to forget_____",
"Coming to Cinema this Season______ The Movie.",
"It's a pity that kids these days all get involved with____",
"The class trip field was completely ruined by_______",
"I got 99 problems but _____ ain't one",
"But before I kill you Mr.Bond I must show you_____",
"After the earthquake Sean Penn brought_______to the people in Haiti."
]   

const questionSchema= new Schema({
    questions=Array
})
const question= mongoose.model("questions",questionSchema);

module.exports=question