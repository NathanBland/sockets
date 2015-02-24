var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function(req,res,next){
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.broadcast.emit('news', { user: 'connected' });
    socket.on('my other event', function(data){
        console.log(data);
    });
});
