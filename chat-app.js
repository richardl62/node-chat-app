const socket = io("http://localhost:3000");

const message_display = document.getElementById("message-display");
const send_form = document.getElementById("send-form");
const message_to_send = document.getElementById("message-to-send");

const name = "Someone"; //prompt("What is your name?");

socket.emit('send-new-user', name);

socket.on('user-disconnected', name =>
{
    append_message(`${name} left`);
});

socket.on('new-user', name =>
{
    append_message(`${name} joined`);
});

send_form.addEventListener('submit', e => {
    e.preventDefault();

    const text = message_to_send.value;
    append_message(`You: ${text}`);

    socket.emit('send-chat-message', text);
    message_to_send.value = '';
});

socket.on('chat-message', message =>
{
    append_message(`${message["name"]}: ${message["text"]}`);
});

function append_message(message)
{
    let message_elem = document.createElement('div');
    message_elem.innerText = message;
    message_display.append(message_elem);  
}