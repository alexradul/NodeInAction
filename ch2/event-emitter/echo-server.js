const net = require('net');

const server = net.createServer(socket => {
  socket.on('data', data => socket.write(data));
}).listen(8888);

console.log('Server is running');
