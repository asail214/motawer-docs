import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

// Redux Store
import { store } from './store';
import { setupOnlineStatusMonitoring } from './store/middleware/persistenceMiddleware';

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

// Import Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/auth/Dashboard';

// Import context (سنبقيه للآن مع Redux)
import ProgressProvider from './contexts/ProgressContext';

// مكون App الداخلي مع إعداد المراقبة
function AppContent() {
  useEffect(() => {
    // إعداد مراقبة حالة الاتصال
    const cleanup = setupOnlineStatusMonitoring(store);
    
    return cleanup;
  }, []);

  return (
    <Router>
      <div className="App" dir="rtl">
        <Navbar />
        <Routes>
          {/* المسارات الأساسية */}
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
          
          {/* مسارات المصادقة */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    // Redux Provider يُغلف كل التطبيق
    <Provider store={store}>
      {/* نبقي ProgressProvider للآن للتوافق العكسي */}
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </Provider>
  );
}

export default App;