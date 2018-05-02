let io;
let num;

// check how many clients are in a current room
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

  // send join message to this socket
  socket.emit('join', { host });
};
const onMessage = (sock) => {
  const socket = sock;
  // temporarily taken out data to pass eslint
  socket.on('startGame', () => {
    socket.broadcast.to(`room${socket.room}`).emit('startGame', {});
  });
  socket.on('createNewEnemyForHost', (data) => {
    socket.broadcast.to(`room${socket.room}`).emit('createNewEnemyForHost', data);
  });
  socket.on('upgradeBase', () => {
    socket.broadcast.to(`room${socket.room}`).emit('upgradeBase', {});
  });
  socket.on('updateNonHost', (data) => {
    socket.broadcast.to(`room${socket.room}`).emit('updateNonHost', data);
  });
  socket.on('gameOver', (data) => {
    socket.broadcast.to(`room${socket.room}`).emit('gameOver', data);
    socket.broadcast.to(`room${socket.room}`).emit('disconnect', {});
  });
};
// temporarily taken out sock to pass eslint
const onDisconnect = (sock) => {
  const socket = sock;
  // Remove user from room, will need to handle what happens to other player.
  console.log('disconnect called');
  // let the other player know they won
  socket.broadcast.to(`room${socket.room}`).emit('gameOver', { win: true });
  socket.leave(socket.room);
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
    // onDisconnect(socket);
    socket.on('disconnect', () => {
      onDisconnect(socket);
    });
  });
};

module.exports.configure = configure;
