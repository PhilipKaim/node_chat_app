const socket = io();
const $ = jQuery; 

socket.on('connect', () => {
    console.log('connected to server');
});

socket.on('disconnect', () => {
    console.log('disconected from server');
});

socket.on('newMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');

    let li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');

    let li = $('<li></li>');
    let a = $('<a target="_blank">My current location</a>');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', (e) => {
    e.preventDefault();

    const messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, () => {
       messageTextBox.val('');
    });
});

const getLocationButton = $('#location-send');
getLocationButton.on('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    getLocationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition((positoin) => {
        getLocationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: positoin.coords.latitude,
            longitude: positoin.coords.longitude
        });
    }, () => {
        getLocationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })
});