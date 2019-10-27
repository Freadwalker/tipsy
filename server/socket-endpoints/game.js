var Session = require("../models/sessions");
var Player = require("../models/players");


module.exports = function(io) {

    io.of("/game").on("connection",client=>{

        client.on("join",data=>{
            client.join(data.pin);
        })

        client.on("start-game", (data)=>{
            client.join(data.pin);
            client.to(data.pin).emit("game-started")
        })
        
        client.on("player-count",data=>{

        })

    })
    
}
