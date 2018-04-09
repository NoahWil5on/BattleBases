let io;

//check how many clients are in a current room
const getNumClients = (room) => {
  const clients = io.nsps['/'].adapter.rooms[room];

  // if the room doesn't exist yet then we return 0
  if (clients === undefined) {
    return 0;
  }
  return clients.length;
};

const onJoined = (sock, host) => {
  const socket = sock;

  //send join message to this socket
  socket.emit('join', {});
};
const onMessage = (sock) => {
  const socket = sock;

};
const onDisconnect = (sock) => {
  const socket = sock;

};
const configure = (ioServer) => {
  io = ioServer;

  io.on('connection', (sock) => {
    const socket = sock;

    onJoined(socket);
    onMessage(socket);
    onDisconnect(socket);
  });
};

module.exports.configure = configure;
