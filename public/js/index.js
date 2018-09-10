const socket = io();
const $ = jQuery; 

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('disconected from server');
});

socket.on('newMessage', (message) => {
    console.log('new message:', message);

    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, () => {

    });
});