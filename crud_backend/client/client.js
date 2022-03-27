const { io } = require("socket.io-client");

const socket = io("ws://localhost:4000");

// send a message to the server
socket.emit("clientEv", {
    name: 'hey, i m client'
});

// receive a message from the server
socket.on('serverEv', (data) => {
    console.log(data);
})