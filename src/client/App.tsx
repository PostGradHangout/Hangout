import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        {/* Uncomment the below and comment the above to work on homepage, vice a versa for Login*/}
        {/* <Route path='/' element={<Homepage />}/> */}
        <Route path='/homepage' element={<Homepage />} />
      </Routes>
    </Router>
  );
};

render(<App />, document.querySelector('#root'));
