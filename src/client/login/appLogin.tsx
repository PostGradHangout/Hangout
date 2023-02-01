import React from 'react';
import { render } from 'react-dom';
import './login.css';
import Login from './Login';
// import Homepage from './login';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   redirect,
// } from 'react-router-dom';

const App = () => {
  return (
    <Login />
    // <Router>
    //   <Routes>
    //     <Route path='/:id' element={<Homepage />} />
    //     <Route path='/' element={<Homepage />} />
    //   </Routes>
    // </Router>
  );
};

render(<App />, document.querySelector('#root'));
