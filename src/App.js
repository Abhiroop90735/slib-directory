import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Compare from './Compare';
import LibraryDetails from './LibraryDetails';
import './App.css';
import Feedback from './Feedback';


function App() {
  const [selectedLibs, setSelectedLibs] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home setSelectedLibs={setSelectedLibs} />} />
        <Route path="/compare" element={<Compare selectedLibs={selectedLibs} />} />
        <Route path="/details/:name" element={<LibraryDetails />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Router>
  );
}

export default App;
