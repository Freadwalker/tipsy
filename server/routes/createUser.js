var express= require("express");
var router= express.Router();

var Session = require("../models/sessions");
var Player = require("../models/players");

router.post("/login", (req, res)=>{
    if(req.body.username===""){
        return
    }
    Session.findOne({pin:req.body.gamePin})
    .then(res=>{
        if(res){
            console.log(res)
            Player.create({username:req.body.username,session:res._id})
        }
    })  
})


module.exports=router;