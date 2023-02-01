import React, { useState } from 'react';
import { render } from 'react-dom';
import './index.css';
import Homepage from '../pages/Homepage';
import Login from '../login/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from 'react-router-dom';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  // console.log('cookies', document.getElementById('cookies'));

  //if cookie.loggedInCookie === 'YES' setLoggedIn(true)

  return (
    <Router>
      <Routes>
        {loggedIn && (
          <>
            <Route path='/:id' element={<Homepage />} />
            <Route path='/' element={<Homepage />} />
          </>
        )}
        {!loggedIn && <Route path='/' element={<Login />} />}
      </Routes>
    </Router>
  );
};

render(<App />, document.querySelector('#root'));
