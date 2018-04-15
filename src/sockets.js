let io;
let num;

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
  socket.join(`room${socket.room}`);

  //send join message to this socket
  socket.emit('join', {host});

};
const onMessage = (sock) => {
  const socket = sock;

  socket.on('startGame', (data) => {
    socket.broadcast.to(`room${socket.room}`).emit('startGame', {});
  });
};
const onDisconnect = (sock) => {
  const socket = sock;

};
const configure = (ioServer) => {
  io = ioServer;
  num = 0;

  io.on('connection', (sock) => {
    const socket = sock;
    let host = false;

    const playersInRoom = getNumClients(`room${num}`);
    switch (playersInRoom) {
      case 0:
        host = true;
        break;
      case 1:
        break;
      default:
        host = true;
        num++;
        break;
    }
    socket.room = num;

    onJoined(socket, host);
    onMessage(socket);
    onDisconnect(socket);
  });
};

module.exports.configure = configure;
