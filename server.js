var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 8000);
console.log(process.env.PORT)

app.get('/', function(req, res, next) {
    res.sendfile(__dirname + '/index.html');
});
var users = 0;
io.on('connection', function(socket) {
    users += 1;
    console.log("client connected");
    socket.broadcast.emit('news', {
        user: 'connected: ' + users
    });
    socket.on('disconnect', function() {
        users -= 1;
        console.log("client disconnected");
        socket.broadcast.emit('news', {
            user: 'disconnected'
        });
    });
    socket.on('message', function(message) {
        console.log(message);
        socket.broadcast.emit('message', message.data);
    });
});
