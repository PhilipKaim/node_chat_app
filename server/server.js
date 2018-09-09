const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
    });
    
    socket.emit('newMessage', {
        from: 'bill123',
        text: 'white board',
        createdAt: Date.now()
    });

});

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});