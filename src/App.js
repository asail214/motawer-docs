import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

// Import components from components folder
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Import pages from pages folder
import LandingPage from './pages/LandingPage';
import FrontendBasics from './pages/FrontendBasics';
import ReactIntroduction from './pages/ReactIntroduction';
import EnvironmentSetup from './pages/EnvironmentSetup';
import CoreConcepts from './pages/CoreConcepts';
import TodoProject from './pages/TodoProject';
import NextSteps from './pages/NextSteps';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';

// Import context
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
            <Route path="/tutorial" element={<HomePage />} />
            <Route path="/learn" element={<HomePage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;