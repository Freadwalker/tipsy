var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require("cors")
// var indexRouter = require('./socket-endpoints/index');
// var usersRouter = require('./socket-endpoints/users');
// var userRouter = require("./socket-endpoints/createUser")

require("dotenv").config()
var app= express();
app.use(express.static(path.join(__dirname, "public/build")));

var server = require('http').createServer(app);

var io = require('socket.io')(server);

//mongoose setup
require("./socket-endpoints/lobby")(io)
require("./socket-endpoints/game")(io)

if(process.env.environment === "DEVELOPMENT") {
  app.use(
    cors({
      credentials:true,
      origin:[`http://localhost:3000`]
    })
  )
}

server.listen(process.env.PORT, ()=> {
  console.log("Listening on port", process.env.PORT)
})



