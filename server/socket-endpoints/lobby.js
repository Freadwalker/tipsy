var Session = require("../models/sessions");
var Player = require("../models/players");


module.exports = function(io) {

    io.of("/lobby").on("connection", client => {
        
        client.on("join-room", data=> {
            Session.create({pin:data.pin})
            client.join(data.pin)
            debugger
        })
        
        client.on("signup", data=> {
            debugger
            Session.findOne({pin:data.pin})
            .then(session=>{
                Player.create({username:data.username,session:session._id})
            })
            debugger
            client.join(data.pin)
            io.to(data.pin).emit("player-joined", {username: data.username})
            debugger
        })
        
        client.on("start-game", (data)=>{
            io.to(data.pin).emit("game-started")
        })
    
    })
    
}

