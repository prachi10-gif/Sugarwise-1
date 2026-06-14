
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Menu, X, ScanLine, LayoutDashboard, ShieldAlert, LogOut } from 'lucide-react';
import SugarMeter from './ui/SugarMeter';
import useAuthStore from '../store/authStore';

interface NavbarProps {
  onScanClick?: () => void;
  onAuthClick?: () => void;
}

export default function Navbar({ onScanClick, onAuthClick }: NavbarProps) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsMobileOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: null },
    { path: '/scan', label: 'Scan Food', icon: <ScanLine className="h-4 w-4" /> },
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, requireAuth: true },
    { path: '/admin', label: 'Admin', icon: <ShieldAlert className="h-4 w-4" />, requireAuth: true },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? 'bg-midnight/90 backdrop-blur-glass border-b border-glass-border-teal/40 shadow-glow-teal'
            : 'bg-transparent border-b border-transparent'
        }`}
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity group"
          onClick={() => setIsMobileOpen(false)}
        >
          {/* SVG Sugar Crystal Logo */}
          <div className="relative w-7 h-7">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
              <defs>
                <filter id="glow-teal">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Crystal shape */}
              <polygon
                points="50,5 85,95 15,95"
                fill="none"
                stroke="#00D4B4"
                strokeWidth="2"
                filter="url(#glow-teal)"
              />
              <line
                x1="50"
                y1="5"
                x2="50"
                y2="95"
                stroke="#00D4B4"
                strokeWidth="2"
                opacity="0.6"
                filter="url(#glow-teal)"
              />
              <line
                x1="35"
                y1="50"
                x2="65"
                y2="50"
                stroke="#FFB347"
                strokeWidth="2"
                opacity="0.8"
                filter="url(#glow-teal)"
              />
            </svg>
          </div>

          <span className="font-extrabold text-xl tracking-widest hidden sm:inline bg-gradient-to-r from-tealAccent to-cyan-400 bg-clip-text text-transparent">
            SUGARSCAN
          </span>
          <span className="font-extrabold text-lg sm:hidden text-tealAccent">SS</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link: any) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-tealAccent'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Sugar Progress (when logged in) */}
        {isAuthenticated && (
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg border border-glass-border-teal bg-bg-secondary/20">
            <SugarMeter valueTsp={3.5} maxTsp={6} size="sm" />
          </div>
        )}

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-300">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-danger/20 text-danger hover:bg-danger/30 transition-colors duration-200 text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onScanClick}
                className="px-4 py-2 rounded-lg bg-tealAccent text-midnight hover:bg-teal-400 transition-colors duration-200 text-sm font-semibold"
              >
                Scan Free
              </button>
              <button
                onClick={onAuthClick}
                className="px-4 py-2 rounded-lg border border-glass-border-teal text-tealAccent hover:bg-tealAccent/10 transition-colors duration-200 text-sm font-medium"
              >
                Sign In
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 hover:bg-midnight/50 rounded-lg transition-colors duration-200"
        >
          {isMobileOpen ? (
            <X className="h-6 w-6 text-tealAccent" />
          ) : (
            <Menu className="h-6 w-6 text-tealAccent" />
          )}
        </button>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMobileOpen ? 1 : 0,
          y: isMobileOpen ? 0 : -20,
          pointerEvents: isMobileOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-16 left-0 right-0 z-40 md:hidden bg-midnight/95 backdrop-blur-glass border-b border-glass-border-teal/40"
      >
        <div className="px-6 py-4 space-y-2 max-h-96 overflow-y-auto">
          {navLinks.map((link: any) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive(link.path)
                  ? 'bg-tealAccent/10 text-tealAccent border border-tealAccent/30'
                  : 'text-text-secondary hover:text-text-primary hover:bg-midnight/50'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}

          {/* Mobile Auth Buttons */}
          <div className="pt-4 border-t border-glass-border-teal/40 space-y-2 mt-4">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-400">
                  Logged in as <span className="text-white font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-danger/20 text-danger hover:bg-danger/30 transition-colors duration-200 text-sm font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onScanClick?.();
                    setIsMobileOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-tealAccent text-midnight hover:bg-teal-400 transition-colors duration-200 text-sm font-semibold"
                >
                  Scan Free
                </button>
                <button
                  onClick={() => {
                    onAuthClick?.();
                    setIsMobileOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-glass-border-teal text-tealAccent hover:bg-tealAccent/10 transition-colors duration-200 text-sm font-medium"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
