import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Store and Hooks
import useAuthStore from './store/authStore';
import useFreeTrial from './hooks/useFreeTrial';

// Components
import Navbar from './components/Navbar';
import AuthModal from './components/auth/AuthModal';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

// Styles
import './index.css';

function App() {
  const { user, refreshUser, isAuthenticated } = useAuthStore();
  const { isTrialExpired, recordScan } = useFreeTrial(isAuthenticated);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'optional' | 'required'>('optional');

  // Initialize auth on mount
  useEffect(() => {
    // Check if user is already logged in
    const storedUser = sessionStorage.getItem('auth_user');
    if (storedUser) {
      try {
        useAuthStore.setState({ user: JSON.parse(storedUser), isAuthenticated: true });
      } catch (err) {
        console.error('Failed to restore user from sessionStorage:', err);
      }
    }

    // Refresh user data from server
    refreshUser();
  }, [refreshUser]);

  /**
   * Handle scan attempt
   * If free trial expired and not authenticated, show required auth modal
   */
  const handleScanAttempt = () => {
    if (!isAuthenticated && isTrialExpired) {
      setAuthModalMode('required');
      setShowAuthModal(true);
    } else {
      // Record the scan
      recordScan();
      // Navigate to scan page or open camera
      console.log('Starting scan...');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-midnight text-white">
        <Navbar 
          onScanClick={handleScanAttempt}
          onAuthClick={() => {
            setAuthModalMode('optional');
            setShowAuthModal(true);
          }}
        />

        <Routes>
          <Route path="/" element={<Home onScanClick={handleScanAttempt} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          mode={authModalMode}
          onClose={() => {
            if (authModalMode === 'optional') {
              setShowAuthModal(false);
            }
          }}
          onSuccess={() => {
            setShowAuthModal(false);
            // If they were trying to scan, trigger it again
            if (isTrialExpired) {
              console.log('User authenticated, ready to scan');
            }
          }}
        />
      </div>
    </Router>
  );
}

export default App;
