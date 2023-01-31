import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';

type ServerError = string;

const app = express();

app.use(express.json());

// API that redirects to GitHub to authorize the account

const clientId = 'fc863cedc9ecd45da5de';
const clientSecret = 'da6f0104ab5cf5d90cbd5cb6abf46b69e09ac10a';

app.get('/', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${clientId}`
  );
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
