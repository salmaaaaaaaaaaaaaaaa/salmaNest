const socket = io('http://localhost:3000');

socket.on('receive_message', msg => {
  const div = document.createElement('div');
  div.innerText = msg.content;
  document.getElementById('messages').appendChild(div);
});

document.getElementById('send').onclick = () => {
  const content = document.getElementById('content').value;
  socket.emit('send_message', { content });
};
