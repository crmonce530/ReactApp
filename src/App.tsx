import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import VirtualAgent from './components/VirtualAgent';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Support from './pages/Support';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/support" element={<Support />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
        <Footer />
        <VirtualAgent />
      </div>
    </Router>
  );
}

export default App; 