var express= require("express");
var router= express.Router();

var Session = require("../models/sessions")
var Player = require("../models/players")

router.get("/lobby/:pin", (req, response)=>{
    debugger
    let pin = req.params.pin;
    io.of(`/${req.body.pin}`).on("connect", (client)=> {
        debugger
    })
    Session.findOne({pin})
        .then((session)=> {
            debugger
            if(session) {
                return Player.find({session: session._id})
                .then((players)=> {
                    response.json({
                        session,
                        players
                    })
                })
            } else {
               return Session.create({
                   pin
               })
               .then((session)=> {
                   response.json({
                       session,
                       players: []
                   })
               })     
            }
        })
        .catch((error)=> {

        })
})


module.exports=router