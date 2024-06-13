import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Login/login';
import Dashboard from './Component/Dashboard';
import Cours from './Cours/Cours';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/planing" element={<planing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/:username" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/:username/cours" element={<Cours />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
