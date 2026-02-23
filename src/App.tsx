import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TestResults from './pages/TestResults';
import BiomarkerDetail from './pages/BiomarkerDetail';
import ActionPlan from './pages/ActionPlan';
import ClinicianNotes from './pages/ClinicianNotes';
import './App.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Layout component for pages with Navbar and Footer
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route 
          path="/" 
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          } 
        />
        <Route 
          path="/how-it-works" 
          element={
            <MainLayout>
              <HowItWorks />
            </MainLayout>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          } 
        />
        <Route 
          path="/test-results" 
          element={
            <MainLayout>
              <TestResults />
            </MainLayout>
          } 
        />
        <Route 
          path="/biomarker/:id" 
          element={
            <MainLayout>
              <BiomarkerDetail />
            </MainLayout>
          } 
        />
        <Route 
          path="/action-plan" 
          element={
            <MainLayout>
              <ActionPlan />
            </MainLayout>
          } 
        />
        <Route 
          path="/clinician-notes" 
          element={
            <MainLayout>
              <ClinicianNotes />
            </MainLayout>
          } 
        />
        {/* Redirect all other routes to Home */}
        <Route 
          path="*" 
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
