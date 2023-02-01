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
import Documents from './models/mongo_model';
import serverUtils from './utils/utils';
import { oauthController } from './controllers/oauthController';
import { userController } from './controllers/userController';
import cookieParser from 'cookie-parser';

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
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(express.static(path.join(__dirname, '../../dist')));

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

// ROUTING HERE

// app.use(
//   '/',
//   //check cookies
//   userController.findUser,
//   (req, res, next) => {
//     res.status(200).send('..');
//   }
//   //if cookie, send to '/'
//   //if no, server login.html
// );

app.use(express.static(path.resolve(__dirname, '../client/public/')));

app.use(
  '/api/oauth2callback',
  (req, res, next) => {
    console.log('entered /oauth2callback');
    return next();
  },
  oauthController.setToken,
  oauthController.getUserInfo,
  userController.createCookie,
  (req, res) => {
    // @ts-ignore
    res.status(200).redirect('/');
  }
);

app.get('/api/userInfo', userController.findUser, (req, res) => {
  res.status(200).json(res.locals.userInfo);
});

app.use(
  '/',
  userController.findUser,
  express.static(path.resolve(__dirname, '../../dist'))
);

app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

server.listen(3000, () => console.log('server is listening on port 3000'));
