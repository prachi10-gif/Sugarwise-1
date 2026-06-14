import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { pageEnterVariants, scanRippleVariants } from '../../lib/animations';

interface PageTransitionProps {
  children: ReactNode;
  isDashboard?: boolean;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, isDashboard = false }) => {
  return (
    <>
      {isDashboard && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          variants={scanRippleVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className="absolute bottom-0 left-1/2 w-96 h-96 rounded-full"
            style={{
              transform: 'translateX(-50%)',
              background: 'radial-gradient(circle, rgba(0, 212, 180, 0.2) 0%, transparent 70%)',
            }}
          />
        </motion.div>
      )}

      <motion.div
        variants={pageEnterVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
