// const app = require('express')();
// const http = require('http').createServer(app);
//
//
// app.get('/', (req, res) => {
//     res.send("Node Server is running. Yay!!")
// });
//
// console.log("adfsadads");
//
// //Socket Logic
// const socketio = require('socket.io')(http);
// console.log("adfsadads");
//
// socketio.on("connection", (userSocket) => {
//     console.log("asaa");
//     userSocket.on("send_message", (data) => {
//         console.log(data);
//         userSocket.broadcast.emit("receive_message", data)
//     })
// });
//
// http.listen(3000);

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log("asaa");
    socket.on("send_message", (data) => {
        console.log(data);
        socket.emit("receive_message", data)
    })
});

http.listen(process.env.PORT, function(){
    console.log('listening on *:3000');
});


