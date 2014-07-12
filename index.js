var express = require('express');
var io = require('socket.io');
var server = require('http');
var path = require('path');
var app = express();
server = require('http').createServer(app);
io = io.listen(server);
app.use(express.static(path.join(__dirname, 'www')));

server.listen(3000, function() {
	console.log('server listening on 3000');
});

io.on('connection', function(socket){
  	console.log('a user connected');

  	socket.on('disconnect', function(){
    	console.log('user disconnected');
    });

    socket.on('chat', function(msg){
        console.log('message: ' + msg);
        io.emit('chat', msg);
    });

});