import { useEffect, useState } from 'react';

/**
 * useFreeTrial Hook
 * Manages free trial logic with localStorage persistence
 * 
 * - Generates anonymous session ID on first load
 * - Tracks free scans used (0-3)
 * - Never decrements free scans (one-way counter)
 * - Triggers auth modal after 3 scans
 * - Does NOT reset on login
 */

const ANONYMOUS_SESSION_KEY = 'sugarwise_anonymous_session_id';
const FREE_SCANS_KEY = 'sugarwise_free_scans_used';
const FREE_SCANS_LIMIT = 3;

interface UseFreeTrial {
  anonymousSessionId: string | null;
  freeScansUsed: number;
  scansRemaining: number;
  isTrialExpired: boolean;
  recordScan: () => void;
  initializeSession: () => Promise<void>;
}

export const useFreeTrial = (isAuthenticated: boolean): UseFreeTrial => {
  const [anonymousSessionId, setAnonymousSessionId] = useState<string | null>(null);
  const [freeScansUsed, setFreeScansUsed] = useState(0);

  // Initialize on mount
  useEffect(() => {
    const initSession = async () => {
      // Only track free scans for anonymous users
      if (isAuthenticated) {
        return;
      }

      // Check if we already have a session ID
      let sessionId = localStorage.getItem(ANONYMOUS_SESSION_KEY);
      
      if (!sessionId) {
        // Generate new session ID
        sessionId = crypto.randomUUID();
        localStorage.setItem(ANONYMOUS_SESSION_KEY, sessionId);

        // Register session with backend
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
          await fetch(`${API_URL}/sessions/init`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId }),
          });
        } catch (error) {
          console.error('Failed to initialize session:', error);
        }
      }

      setAnonymousSessionId(sessionId);

      // Load free scans used from localStorage
      const scansUsed = parseInt(localStorage.getItem(FREE_SCANS_KEY) || '0', 10);
      setFreeScansUsed(scansUsed);
    };

    initSession();
  }, [isAuthenticated]);

  /**
   * Record a scan - increment free scans counter
   * Never decrements, only increases
   */
  const recordScan = () => {
    if (isAuthenticated) {
      // Authenticated users have unlimited scans
      return;
    }

    const currentScans = parseInt(localStorage.getItem(FREE_SCANS_KEY) || '0', 10);
    if (currentScans < FREE_SCANS_LIMIT) {
      const newScans = currentScans + 1;
      localStorage.setItem(FREE_SCANS_KEY, String(newScans));
      setFreeScansUsed(newScans);
    }
  };

  /**
   * Manually initialize free trial (used in tests or resets)
   */
  const initializeSession = async () => {
    const sessionId = crypto.randomUUID();
    localStorage.setItem(ANONYMOUS_SESSION_KEY, sessionId);
    localStorage.setItem(FREE_SCANS_KEY, '0');
    setAnonymousSessionId(sessionId);
    setFreeScansUsed(0);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await fetch(`${API_URL}/sessions/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
    } catch (error) {
      console.error('Failed to initialize session:', error);
    }
  };

  return {
    anonymousSessionId,
    freeScansUsed,
    scansRemaining: Math.max(0, FREE_SCANS_LIMIT - freeScansUsed),
    isTrialExpired: freeScansUsed >= FREE_SCANS_LIMIT,
    recordScan,
    initializeSession,
  };
};

export default useFreeTrial;
