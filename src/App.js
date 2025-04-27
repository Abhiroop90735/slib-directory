import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Compare from './Compare';
import LibraryDetails from './LibraryDetails';
import Feedback from './Feedback';
import Admin from './Admin';

function App() {
  const [selectedLibs, setSelectedLibs] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route 
        path="/home" 
        element={<Home setSelectedLibs={setSelectedLibs} />} 
      />
      <Route 
  path="/compare" 
  element={<Compare selectedLibs={selectedLibs} setSelectedLibs={setSelectedLibs} />} 
/>
      <Route 
        path="/details/:name" 
        element={<LibraryDetails />} 
      />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
