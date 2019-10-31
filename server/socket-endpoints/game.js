


module.exports = function(io) {

    io.of("/game").on("connection",client=>{

        client.on("join",data=>{
            client.join(data.pin);
        })

        client.on("start-game", (data)=>{
            client.join(data.pin);
            client.to(data.pin).emit("game-started")
        })

        client.on("questionsGameOne",data=>{
            client.join(data.pin);
            client.to(data.pin).emit("questionsOne", data )
        })
        
        client.on("answersSubmit",data=>{
            client.join(data.pin);
            client.to(data.pin).emit("answersToQuestions",data)
        })
        client.on("toVoting",data=>{
            client.to(data.pin).emit("goVoting")
        })
        client.on("voteFirst",data=>{
            client.to(data.pin).emit("voteFirst",data)
        })
        client.on("voteSecond",data=>{
             client.to(data.pin).emit("voteSecond",data)
        })
        client.on("nextQuestion",data=>{
            client.to(data.pin).emit("nextQuestion");
        })
        client.on("toScoreScreen",data=>{
            client.to(data.pin).emit("toScoreScreen")
        })
    })
    
}
