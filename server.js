const io = require("socket.io")(3000)

var names = new Set;

io.on('connection', socket => {
    
    socket.on('send-chat-message', message =>{
        const data = {
            "name": names[socket.id],
            "text": message,
        };
        //console.log(data["name"], data["text"], socket.id);
        socket.broadcast.emit('chat-message', data); 
    })

    socket.on('send-new-user', name =>{
        console.log('New user:', name, socket.id);
        names[socket.id] = name;
        socket.broadcast.emit('new-user', name)
    })

    socket.on('disconnect', ()=>{
        console.log('Goodbye ', names[socket.id], socket.id);
        socket.broadcast.emit('user-disconnected', names[socket.id]);
        delete names[socket.id];

    })
})
