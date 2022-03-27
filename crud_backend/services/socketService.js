var io;

function addIOEventHandlers(_io) {
    io = _io;

    console.log("testtttt");
    io.sockets.on('connection', async function (socket) {
        console.log("new connection established:" + socket.id);

        socket.emit('serverEv', {
            msg: 'Hey, I am server'
        })

        socket.on('clientEv', (data) => {
            console.log(data);
        })
    })

}

exports.addIOEventHandlers = addIOEventHandlers;