var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")
const cors = require("cors")
// var indexRouter = require('./socket-endpoints/index');
// var usersRouter = require('./socket-endpoints/users');
// var userRouter = require("./socket-endpoints/createUser")

require("dotenv").config()
var server = require('http').createServer();
var io = require('socket.io')(server);
var app= express();

//mongoose setup
mongoose
  .connect('mongodb://localhost/tipsy', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

require("./socket-endpoints/lobby")(io)
require("./socket-endpoints/game")(io)

app.use(
  cors({
    credentials:true,
    origin:[`http://localhost:3000`]
  })
)
server.listen(process.env.PORT, ()=> {
  console.log("Listening on port", process.env.PORT)
})



