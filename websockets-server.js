// part 4
var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;
var ws = new WebSocketServer({
    port: port
});
var messages = [];

console.log('websockets server started');

ws.on('connection', function (socket) {
    console.log('client connection established');

    // reads past messages here (array)
    messages.forEach(function (msg) {
        // outputs here
        socket.send(msg);
    });
    
    socket.on('message', function (data) {
        console.log('message received: ' + data);
        // if user types '/topic' then topic will change
        if(data.substring(0,7) === '/topic ') {
            // active user will see ***Topic has changed and its not save in the array
            var tmp = "*** Topic has changed to " + data.substring(7,data.length);
            // send to all users here
            ws.clients.forEach(function (clientSocket) {
                clientSocket.send(tmp)
            });
            // "*** Topic is" will be the first msg new users will receive 
            var tmp2 = "*** Topic is " + data.substring(7,data.length);
            messages.unshift(tmp2); // this moves topic to the top of array
        } else {
            messages.push(data); // pushes msg to message array
            // sends to all users in the chat
            ws.clients.forEach(function (clientSocket) {
                clientSocket.send(data)
            });
        }
    });
});

