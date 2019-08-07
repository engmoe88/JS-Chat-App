const io = require('socket.io')(3000); // thix creates a server

//object to store users data
const users = {};

//everytime a user loads the page it's gonna load this function
io.on('connection', socket => {
    socket.on('new-user', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);

    });
    socket.on('send-chat-message', msg => {
        socket.broadcast.emit('chat-message', {message: msg, name: users[socket.id]}); // this will send the message to all users connected to the server except the origin of the message (the sender)
    });
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});

