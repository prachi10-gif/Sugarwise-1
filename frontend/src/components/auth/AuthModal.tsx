import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import { fadeUpVariants, staggerContainer } from '../../lib/animations';

export type AuthModalMode = 'optional' | 'required';

interface AuthModalProps {
  isOpen: boolean;
  mode: AuthModalMode;
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * Auth Modal Component
 * Glassmorphism modal for login and registration
 * 
 * Modes:
 * - 'optional': User can close the modal (e.g., from navbar)
 * - 'required': User cannot close, must authenticate (after free trial expires)
 */
export const AuthModal = ({ isOpen, mode, onClose, onSuccess }: AuthModalProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    // Sign In
    email: '',
    password: '',
    showPassword: false,
    // Register
    name: '',
    confirmPassword: '',
    dateOfBirth: '',
    preferredLanguage: 'en',
    agreeToTerms: false,
  });

  const { login, register, isLoading, error } = useAuthStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      onSuccess();
    } catch (err) {
      // Error handled by store
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to terms of service');
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        dateOfBirth: formData.dateOfBirth,
        preferredLanguage: formData.preferredLanguage,
      });
      onSuccess();
    } catch (err) {
      // Error handled by store
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-40 ${mode === 'required' ? 'backdrop-blur-md' : 'bg-black/50'}`}
            onClick={mode === 'optional' ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={mode === 'optional' ? onClose : undefined}
            onClickCapture={(e) => e.stopPropagation()}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl border border-glass-border-teal bg-midnight/95 backdrop-blur-glass shadow-glow-teal-bright p-8"
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    {mode === 'required' ? 'Your 3 Free Scans Are Up!' : 'SugarScan'}
                  </h2>
                  {mode === 'optional' && (
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {mode === 'required' && (
                  <p className="text-gray-300 text-sm">
                    Sign in or create an account to continue scanning
                  </p>
                )}
              </div>

              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-glass-border-teal">
                <button
                  onClick={() => setIsSignIn(true)}
                  className={`pb-3 font-medium transition-colors ${
                    isSignIn
                      ? 'text-tealAccent border-b-2 border-tealAccent'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignIn(false)}
                  className={`pb-3 font-medium transition-colors ${
                    !isSignIn
                      ? 'text-tealAccent border-b-2 border-tealAccent'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-lg bg-danger/20 border border-danger/50 text-danger text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Sign In Form */}
              {isSignIn ? (
                <motion.form
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  onSubmit={handleSignIn}
                  className="space-y-4"
                >
                  {/* Email */}
                  <motion.div variants={fadeUpVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-midnight border border-glass-border-teal text-white placeholder-gray-500 focus:outline-none focus:border-tealAccent focus:ring-2 focus:ring-tealAccent/20 transition-all"
                      placeholder="you@example.com"
                    />
                  </motion.div>

                  {/* Password */}
                  <motion.div variants={fadeUpVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={formData.showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-midnight border border-glass-border-teal text-white placeholder-gray-500 focus:outline-none focus:border-tealAccent focus:ring-2 focus:ring-tealAccent/20 transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, showPassword: !formData.showPassword })
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {formData.showPassword ? '👁️‍🗨️' : '👁️'}
                      </button>
                    </div>
                  </motion.div>

                  {/* Forgot Password */}
                  <motion.div variants={fadeUpVariants}>
                    <button
                      type="button"
                      onClick={() => alert('Password reset email sent!')}
                      className="text-sm text-tealAccent hover:text-teal-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </motion.div>

                  {/* Submit */}
                  <motion.button
                    variants={fadeUpVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 mt-6 rounded-lg bg-tealAccent text-midnight font-semibold hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </motion.button>
                </motion.form>
              ) : (
                /* Register Form */
                <motion.form
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  {/* Name */}
                  <motion.div variants={fadeUpVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-midnight border border-glass-border-teal text-white placeholder-gray-500 focus:outline-none focus:border-tealAccent focus:ring-2 focus:ring-tealAccent/20 transition-all"
                      placeholder="John Doe"
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={fadeUpVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-midnight border border-glass-border-teal text-white placeholder-gray-500 focus:outline-none focus:border-tealAccent focus:ring-2 focus:ring-tealAccent/20 transition-all"
                      placeholder="you@example.com"
                    />
                  </motion.div>

                  {/* Password */}
                  <motion.div variants={fadeUpVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password (min 8 chars, must include number)
                    </label>
                    <div className="relative">
                      <input
                        type={formData.showPassword ? 'text' : 'password'}
                        name="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                        className="w-full px-4 py-2 rounded-lg bg-midnight border border-glass-border-teal text-white placeholder-gray-500 focus:outline-none focus:border-tealAccent focus:ring-2 focus:ring-tealAccent/20 transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, showPassword: !formData.showPassword })
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {formData.showPassword ? '👁️‍🗨️' : '👁️'}
                      </button>
                    </div>
                  </motion.div>

                  {/* Confirm Password */}
                  <motion.div variants={fadeUpVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-midnight border border-glass-border-teal text-white placeholder-gray-500 focus:outline-none focus:border-tealAccent focus:ring-2 focus:ring-tealAccent/20 transition-all"
                      placeholder="••••••••"
                    />
                  </motion.div>

                  {/* Date of Birth */}
                  <motion.div variants={fadeUpVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date of Birth (optional)
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-midnight border border-glass-border-teal text-white placeholder-gray-500 focus:outline-none focus:border-tealAccent focus:ring-2 focus:ring-tealAccent/20 transition-all"
                    />
                  </motion.div>

                  {/* Language Preference */}
                  <motion.div variants={fadeUpVariants}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Language
                    </label>
                    <select
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-midnight border border-glass-border-teal text-white focus:outline-none focus:border-tealAccent focus:ring-2 focus:ring-tealAccent/20 transition-all"
                    >
                      <option value="en">English</option>
                      <option value="hi">हिंदी</option>
                      <option value="ta">தமிழ்</option>
                      <option value="te">తెలుగు</option>
                      <option value="bn">বাংলা</option>
                    </select>
                  </motion.div>

                  {/* Terms */}
                  <motion.div variants={fadeUpVariants} className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 rounded border border-glass-border-teal accent-tealAccent cursor-pointer"
                    />
                    <label className="text-xs text-gray-400">
                      I agree to the{' '}
                      <button type="button" className="text-tealAccent hover:underline">
                        Terms of Service
                      </button>
                      {' '}and{' '}
                      <button type="button" className="text-tealAccent hover:underline">
                        Privacy Policy
                      </button>
                    </label>
                  </motion.div>

                  {/* Submit */}
                  <motion.button
                    variants={fadeUpVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 mt-6 rounded-lg bg-tealAccent text-midnight font-semibold hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </motion.button>
                </motion.form>
              )}

              {/* Footer Text */}
              <motion.p
                variants={fadeUpVariants}
                className="text-center text-sm text-gray-400 mt-6"
              >
                {isSignIn ? "Don't have an account? " : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="text-tealAccent hover:underline font-medium"
                >
                  {isSignIn ? 'Create Account' : 'Sign In'}
                </button>
              </motion.p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
