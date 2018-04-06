let io;

// checks how many clients are in any given room
const getNumClients = (room) => {
  const clients = io.nsps['/'].adapter.rooms[room];

  // if the room doesn't exist yet then we return 0
  if (clients === undefined) {
    return 0;
  }
  return clients.length;
};
// anytime a client joins do this
const onJoined = (sock, host) => {
  const socket = sock;
  socket.join(`room${socket.room}`);

  // announce that you have joined
  socket.emit('join', socket.player);

};
// when the socket recieves a message do these
const onMessage = (sock) => {
  const socket = sock;

};
// when a user leaves call this
const onDisconnect = (sock) => {
  const socket = sock;

};
// initialize and configure server
const configure = (ioServer) => {
  io = ioServer;

  // anytime there's a new connection run this
  io.on('connection', (sock) => {
    const socket = sock;

    onJoined(socket, host);
    onMessage(socket);
    onDisconnect(socket);
  });
};

module.exports.configure = configure;
