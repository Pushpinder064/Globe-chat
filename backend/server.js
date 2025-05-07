

const express = require('express');
const socketIo = require('socket.io')
const cors = require('cors');
const http = require('http');
const port = 3000;
const app = express();
const server =http.createServer(app);

app.use(cors({origin:'http://localhost:5173'}))
const io = socketIo(server,{
  cors:{
    origin:'http://localhost:5173',
    methods:['GET','POST']
  }
});


io.on('connection',(socket)=>{
console.log("socket connection established");

socket.on('message',(data)=>{
  io.emit('message',data);
})

socket.on('disconnect',()=>{
  console.log("dissconected")
})
}
);

server.listen(port);






