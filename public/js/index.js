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
    let template = $('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage', (message) => {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = $('#location-message-template').html();
    let html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    $('#messages').append(html);
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