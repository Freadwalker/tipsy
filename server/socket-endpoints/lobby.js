var Session = require("../models/sessions");
var Player = require("../models/players");


module.exports = function(io) {

    io.of("/lobby").on("connection", client => {
        
        client.on("join-room", data=> {

            Session.create({pin:data.pin})
            client.join(data.pin)
        })
        
        client.on("signup", data=> {
            Session.findOne({pin:data.pin})
            .then(session=>{
                Player.create({username:data.username,session:session._id})
            })

            client.join(data.pin)

            client.to(data.pin).emit("player-joined", {username: data.username})
            
        })
        
        client.on("start-game", (data)=>{
            io.to(data.pin).emit("game-started")
        })
    
    })
    
}

