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
"After the earthquake Sean Penn brought_______to the people in Haiti.",
"During Sex I like to think about _______",
"In the new Disney Channel Movie, Hannah Montana struggles with _______",
"A romantic candlelight dinner would be incomplete without _______",
"Next from J.K. Harry Potter and the Chamber of _______",
"Instead of coal, Santa now gives the bad children ________",
"What's worse than the Holocaust?",
"I always carry_______ in my purse.",
"Sometimes I just look at the kids and I think______",
"What's your favorite kind of torture?",
"10% of adults admit to having an addiction to _______",
"I'm sorry professor, but I couldn't complete my homework because of _______",
"The last thing you see before you die",
"What's the next Happy Meal Toy?",
"What gives me uncontrollable Gas?",
"TSA guidelines now prohibit ______ on airplanes."

]   

const questionSchema= new Schema({
    questions=Array
})
const question= mongoose.model("questions",questionSchema);

module.exports=question