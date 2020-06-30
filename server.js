// var express = require('express');

const { on } = require('process');

var express = require('express');
var app = express(); 
var http = require('http').createServer(app);
var io = require('socket.io')(http)

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html'); //zasto mora ovo __dirname?
// });

app.use(express.static('./public'))

io.on('connection',(socket)=>{
  console.log('a new user connected.')
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('chat-message', (msg)=>{
    console.log('message from user: ' + msg);
    io.emit('chat-msg-from-server',msg);
    console.log('sending user:' + msg)
  })
});

http.listen(3000,()=>{
  console.log('listening on port 3000.')
})
