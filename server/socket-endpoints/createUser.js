var express= require("express");
var router= express.Router();
var Session = require("../models/sessions");
var Player = require("../models/players");

router.post("/login", (req, res)=>{
    debugger
    if(req.body.username===""){
        return
    }
    debugger
    Session.findOne({pin:req.body.pin})
    .then(session=>{
        if(session){
            console.log(session)
            Player.create({username:req.body.username,session:session._id})
            .then( user => {
                debugger
                io.to(`/${req.body.pin}`).emit("signup", {user})
                res.send("ok")
            })
        }
    })
    .catch(err=>{
        debugger
        console.log(err)
    })
})


module.exports=router;