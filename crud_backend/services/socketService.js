var io;

function addIOEventHandlers(_io) {
    io = _io;

    io.sockets.on('connection', async function (socket) {
        console.log("new connection established:" + socket.id);

        socket.emit('serverEv', {
            msg: 'Hey, I am server'
        })

        socket.on('clientEv', (data) => {
            console.log(data);
        })
    })

    /* broadcast to room  */
    // socket.broadcast.to(roomName).emit(context, message);
}


function emitToAllInClusterRoom(roomName, context, message) {
    console.log('emitToAllInClusterRoom:', roomName, context, message);
    io.to(roomName).emit(context, message);
}

module.exports = {
    addIOEventHandlers,
    emitToAllInClusterRoom
}
