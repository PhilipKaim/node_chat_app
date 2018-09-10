const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconected');
    });
    
    socket.on('createMessage', (message) => {
        console.log('create message:', message);

        // sends a message to everyone
        io.emit('newMessage', generateMessage(message.from, message.text));
    });

    // sends to current user only
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // send to every user except the current user
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});