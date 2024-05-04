// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; 
import NavbarComponent from './NavbarComponent';
import FooterComponent from './FooterComponent';
import PredictionComponent from './PredictionComponent';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import LoginPage from './LoginPage';
import RegPage from './RegPage';
import ProfilePage from './ProfilePage';
import PredictionHistory from './PredictionHistory';
import LateBlightPage from './LateBlightPage';
import EarlyBlightPage from './EarlyBlightPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider> 
      <Router>
        <NavbarComponent />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ai-engine" element={<PredictionComponent />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/RegPage" element={<RegPage />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/PredictionHistory" element={<PredictionHistory />} />
            <Route path="/LateBlightPage" element={<LateBlightPage />} />
            <Route path="/EarlyBlightPage" element={<EarlyBlightPage />} />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </AuthProvider>
  );
}

export default App;
