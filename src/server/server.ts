import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import oauthController from './controllers/oauthController';
import cookieController from './controllers/cookieController';
import userController from './controllers/userController';
import sessionController from './controllers/sessionController';

type ServerError = string;

const app = express();

app.use(express.json());

// API that redirects to GitHub to authorize the account
// Successful attempts will redirect to http://localhost:8080/oauth2callback with parameter "code" in query string

const clientId = 'fc863cedc9ecd45da5de';
const clientSecret = 'da6f0104ab5cf5d90cbd5cb6abf46b69e09ac10a';

app.get('/oauth', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}`
  );
});

//get call to /oauth2callback comes directly from GitHub after a successful login

app.get('/oauth2callback', oauthController.setToken, (req, res) => {
  res.response(200).redirect('./Homepage.tsx');
});

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
