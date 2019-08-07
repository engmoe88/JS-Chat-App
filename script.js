//this is where all the client side javascript code goes

//get the socket object
const socket = io('http://localhost:3000');
//get the input element
const messageInput = document.getElementById('message-input');
//get the message container
const messageContainer = document.getElementById('message-container');
const name = prompt('What is your name?');
//calling the appendMessage func 
appendMessage('You joined');
socket.emit('new-user', name); // sending the new message back to the server when a new user joins.



socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
})

//to display that a user has connected
socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
});

//to display that a user has disconnected
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
});


const messageForm = document.getElementById('send-container');

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    // preventing default will prevent the form from submitting and losing all data (chat messages).
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message); // this will send the message to the server
    messageInput.value = ''; // cleating the input field after the message has been sent
});

function appendMessage(msg) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = msg;
    messageContainer.append(messageElement);
}