import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { glassCardHoverVariants } from '../../lib/animations';

interface GlassCardProps extends MotionProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'teal' | 'amber' | 'danger' | 'none';
  interactive?: boolean;
  onClick?: () => void;
}

const glowColorMap = {
  teal: 'shadow-glow-teal-bright',
  amber: 'shadow-glow-amber',
  danger: 'shadow-glow-danger',
  none: '',
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glowColor = 'none',
  interactive = false,
  onClick,
  ...motionProps
}) => {
  const baseClasses = `
    relative rounded-2xl backdrop-blur-glass border border-glass-border-teal
    bg-glass-border-teal/20 bg-opacity-glass
    ${glowColorMap[glowColor]}
    transition-smooth
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  if (interactive) {
    return (
      <motion.div
        className={baseClasses}
        variants={glassCardHoverVariants}
        initial="rest"
        whileHover="hover"
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={baseClasses}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
