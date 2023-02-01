import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import Documents from './model';
import serverUtils from './utils/utils';

// async function findOrCreateDocument(_id: any, data: string = '') {
//   if (_id == null) return;
//   const document = await Documents.findById(_id);
//   if (document) return document;
//   return await Documents.create({ _id, data });
// }
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const userSocketMap: any = {};
const allowedOrigins = ['http://localhost:8080'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
type ServerError = string;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../../dist')));

// utility function get all clients
// function getAllClients(roomId: any) {
//   return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
//     (socketId: any) => {
//       return {
//         socketId,
//         username: userSocketMap[socketId].username,
//       };
//     }
//   );
// }

//io is the socket server
io.on('connection', (socket: any) => {
  socket.on('join', async ({ username, roomId }: any) => {
    socket.join(roomId);
    userSocketMap[socket.id] = { username, roomId };
    const clients = serverUtils.getAllClients(
      io.sockets.adapter.rooms.get(roomId),
      userSocketMap[socket.id].username,
      roomId
    );
    clients.forEach((client: any) => {
      let socketId = client.socketId;
      io.to(socketId).emit('joined', {
        username: username,
        socketId: socket.id,
        clients,
      });
    });
    const document = await serverUtils.findOrCreateDocument(roomId, '');
    io.to(socket.id).emit('load-document', document.data);
  });

  socket.on('send-changes', ({ roomId, delta }: any) => {
    console.log('server got code: ', roomId, delta);
    socket.broadcast.to(roomId).emit('receive-changes', delta);
  });

  socket.on('save-document', async ({ roomId, data }: any) => {
    await Documents.findByIdAndUpdate(roomId, { data });
  });

  socket.on('disconnecting', () => {
    const rooms: string[] = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit('disconnected', {
        username: userSocketMap[socket.id]?.username,
        socketId: socket.id,
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

app.use(
  '/',
  (err: ServerError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

server.listen(3000, () => console.log('server is listening on port 3000'));
