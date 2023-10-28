const socket = io();

function joinChannel() {
  const channel = document.getElementById('channel').value;
  socket.emit('join', channel);
}

function leaveChannel() {
  const channel = document.getElementById('channel').value;
  socket.emit('leave', channel);
}

function sendMessage() {
  const channel = document.getElementById('channel').value;
  const message = document.getElementById('message').value;
  socket.emit('message', { channel, text: message });
}

socket.on('message', (message) => {
  const chatDiv = document.getElementById('chat');
  chatDiv.innerHTML += `<p><strong>${message.sender}:</strong> ${message.text}</p>`;
});