import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import FrontendBasics from './components/FrontendBasics';
import ReactIntroduction from './components/ReactIntroduction';
import EnvironmentSetup from './components/EnvironmentSetup';
import CoreConcepts from './components/CoreConcepts';
import TodoProject from './components/TodoProject';
import NextSteps from './components/NextSteps';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';

// Fixed import path - added 's' to contexts
import ProgressProvider from './contexts/ProgressContext';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <div className="App" dir="rtl">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/frontend-basics" element={<FrontendBasics />} />
            <Route path="/react-introduction" element={<ReactIntroduction />} />
            <Route path="/environment-setup" element={<EnvironmentSetup />} />
            <Route path="/core-concepts" element={<CoreConcepts />} />
            <Route path="/todo-project" element={<TodoProject />} />
            <Route path="/next-steps" element={<NextSteps />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;