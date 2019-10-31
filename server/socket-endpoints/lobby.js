


module.exports = function(io) {

    io.of("/lobby").on("connection", client => {
        
        client.on("join-room", data=> {
            client.join(data.pin)
        })

        client.on("join",data=>{
            client.join(data.pin)
        }) 


        client.on("signup", data=> {
            client.join(data.pin)
            client.to(data.pin).emit("player-joined", {username: data.username})
        })
        
        client.on("start-game", (data)=>{
            client.join(data.pin);
            client.to(data.pin).emit("game-started")
        })
    
    })
    
}

