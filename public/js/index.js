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

socket.on('newLocationMessage', (message) => {
    let li = $('<li></li>');
    let a = $('<a target="_blank"> My location</a>');

    li.text(`${message.from}`);
    a.attr('href', message.url);
    li.append(a);
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

const getLocationButton = $('#location-send');
getLocationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition((positoin) => {
        socket.emit('createLocationMessage', {
            latitude: positoin.coords.latitude,
            longitude: positoin.coords.longitude
        });
    }, () => {
        alert('Unable to fetch location');
    })
});