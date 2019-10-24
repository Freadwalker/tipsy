var express= require("express");
var router= express.Router();

var Session = require("../models/sessions")

router.get("/lobby/:id", (req, res)=>{
    let lobbyId = req.params.id;
    Session.create({pin:lobbyId,questions:null})
})


module.exports=router;