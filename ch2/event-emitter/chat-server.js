const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
channel.on('join', (id, client) => {
  channel.clients[id] = client;
  channel.subscriptions[id] = (senderId, message) => {
    if (id !== senderId) {
      client.write(message);
    }
  };
  channel.on('broadcast', channel.subscriptions[id]);
});
channel.on('leave', id => {
  channel.removeListener('broadcast', channel.subscriptions[id]);
  channel.emit('broadcast', id, `${id} has left the chatroom.\n`);
});
channel.on('shutdown', () => {
  channel.emit('broadcast', '', 'The server is shutting down.\n');
  channel.removeAllListeners('broadcast');
});

const server = net.createServer(client => {
  const id = `${client.remoteAddress}:${client.remotePort}`
  channel.emit('join', id, client);
  client.on('data', data => {
    data = data.toString();
    if (data === 'shutdown\r\n') {
      channel.emit('shutdown');
    } else {
      channel.emit('broadcast', id, data);
    }
  });
  client.on('close', () => {
    channel.emit('leave', id);
  });
}).listen(8888);

console.log('server listening');
