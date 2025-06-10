import { Server } from 'socket.io';
import { Message } from '../models/Message';

export const registerSocketEvents = (io: Server) => {
  io.on('connection', (socket) => {
    socket.on('join', (room: string) => {
      socket.join(room);
    });

    socket.on('message', async ({ room, content }) => {
      const userId = (socket as any).userId;
      const message = await Message.create({ sender: userId, recipient: room, content });
      io.to(room).emit('message', message);
    });
  });
};
