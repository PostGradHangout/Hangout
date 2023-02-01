import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import { oauthController } from './controllers/oauthController';
import { cookieController } from './controllers/cookieController';
import { userController } from './controllers/userController';
import { sessionController } from './controllers/sessionController';
import cors from 'cors';

type ServerError = string;

const app = express();

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

app.use(cors());

app.use(express.json());

// API that redirects to GitHub to authorize the account
// Successful attempts will redirect to http://localhost:8080/oauth2callback with parameter "code" in query string

const clientId = 'fc863cedc9ecd45da5de';
const clientSecret = 'da6f0104ab5cf5d90cbd5cb6abf46b69e09ac10a';

app.use('/api/oauth2callback', (req, res, next) => {
  console.log('entered /oauth2callback');
  return next();
}, oauthController.setToken, (req, res) => {
  res.status(200).redirect('/homepage');
});

app.get('/api/oauth', oauthController.redirect,(req, res) => {
  console.log('entered /api/oauth');
  res.status(200).json({success : true})
});
// TEST LINK: https://github.com/login/oauth/authorize?client_id=fc863cedc9ecd45da5de

//get call to /oauth2callback comes directly from GitHub with a body of "code" after a successful login



// user controller, cookie controller, session controller

// route for main page
// checks if logged in, if not redirects to login
// creates cookie
// creates session
// redirects to main page with user info

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

app.listen(3000, () => console.log('server is listening on port 3000'));
