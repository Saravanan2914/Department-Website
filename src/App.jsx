import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import AdminDashboard from './pages/AdminDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Gallery from './pages/Gallery';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
