const uuid = require('node-uuid');
const {checkAvailableUsers} = require("../utils");


module.exports = io => {

    const currentUsers = {};

    io.on('connection', (socket) => {
        console.log('User connected');
        currentUsers[socket.id] = {
            roomId: null,
            isEngaged: false,
        };


        socket.on('connectWithUser', function (data) {
            const availableUsers = checkAvailableUsers(currentUsers, socket.id);
            if(availableUsers.length > 0) {
                const engagedRoomId = currentUsers[availableUsers[0]].roomId;
                currentUsers[socket.id].roomId = engagedRoomId;

                currentUsers[socket.id].isEngaged = true;
                currentUsers[availableUsers[0]].isEngaged = true;


                socket.join(engagedRoomId);
                socket.emit('joined_room', {
                    id: engagedRoomId,
                    accUser:socket.id,
                    type: 'acceptedUser'
                });
                socket.to(engagedRoomId).emit('userConnected',{id:socket.id})
            }else {
                const roomId = uuid.v4();
               currentUsers[socket.id].roomId = roomId;
                socket.join(roomId);
                socket.emit('joined_room', {
                    id: roomId,
                    reqUser:socket.id,
                    type: 'requestedUser'
                })
            }

            socket.on('onMessage',(data)=> {
                const roomId = data['roomId'];
                const message = data['message'];
               socket.to(roomId).emit('newMessage',message);
            });



        });

        socket.on('say to someone', function (data) {
            console.log(data['id']);
            io.to(data['id']).emit('message', data.message);
        });


        socket.on('disconnect', function (data) {
            delete currentUsers[socket.id];
        });


    });


};
