import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Homepage from './pages/Homepage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/:id' element={<Homepage />} />
        <Route path='/' element={<Homepage />} />
      </Routes>
    </Router>
  );
};

render(<App />, document.querySelector('#root'));
