import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface SugarMeterProps {
  valueTsp: number;
  maxTsp?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const SugarMeter: React.FC<SugarMeterProps> = ({
  valueTsp,
  maxTsp = 6,
  size = 'md',
  animated = true,
}) => {
  const sizeMap = {
    sm: { radius: 50, centerSize: 80, fontSize: '20px' },
    md: { radius: 70, centerSize: 140, fontSize: '36px' },
    lg: { radius: 90, centerSize: 180, fontSize: '48px' },
  };

  const config = sizeMap[size];
  const circumference = 2 * Math.PI * config.radius;
  const percentage = Math.min(valueTsp / maxTsp, 1);
  const strokeDashoffset = circumference * (1 - percentage);

  // Determine color based on value
  const getColor = () => {
    if (valueTsp <= 3) return '#22C55E'; // green
    if (valueTsp <= 5) return '#FFB347'; // amber
    return '#FF4757'; // danger red
  };

  const getBackgroundColor = () => {
    if (valueTsp <= 3) return 'rgba(34, 197, 94, 0.1)';
    if (valueTsp <= 5) return 'rgba(255, 179, 71, 0.1)';
    return 'rgba(255, 71, 87, 0.1)';
  };

  const teaspoonIcons = useMemo(() => {
    const icons = [];
    const filledCount = Math.ceil(valueTsp);
    for (let i = 0; i < Math.min(maxTsp, 6); i++) {
      icons.push({
        filled: i < filledCount,
        opacity: i < filledCount ? 1 : 0.2,
      });
    }
    return icons;
  }, [valueTsp, maxTsp]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Circular Arc */}
      <div className="relative" style={{ width: config.centerSize, height: config.centerSize }}>
        {/* Background circle */}
        <svg
          className="absolute inset-0"
          width={config.centerSize}
          height={config.centerSize}
          viewBox={`0 0 ${config.centerSize} ${config.centerSize}`}
        >
          <circle
            cx={config.centerSize / 2}
            cy={config.centerSize / 2}
            r={config.radius}
            fill="none"
            stroke={getBackgroundColor()}
            strokeWidth="8"
            style={{ filter: 'drop-shadow(0 0 20px rgba(0, 212, 180, 0.1))' }}
          />
          {/* Progress arc */}
          <motion.circle
            cx={config.centerSize / 2}
            cy={config.centerSize / 2}
            r={config.radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? undefined : strokeDashoffset}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 15px ${getColor()})`,
              transformOrigin: `${config.centerSize / 2}px ${config.centerSize / 2}px`,
              transform: 'rotate(-90deg)',
            }}
            animate={{
              strokeDashoffset: strokeDashoffset,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div
              style={{ fontSize: config.fontSize }}
              className="font-bold text-gradient-teal"
            >
              {valueTsp.toFixed(1)}
            </div>
            <div className="text-sm text-text-secondary">tsp</div>
          </motion.div>
        </div>
      </div>

      {/* Teaspoon indicators */}
      <div className="flex gap-2 justify-center flex-wrap max-w-xs">
        {teaspoonIcons.map((icon, idx) => (
          <motion.div
            key={idx}
            className="text-2xl"
            animate={{ opacity: icon.opacity }}
            transition={{ duration: 0.3 }}
          >
            🥄
          </motion.div>
        ))}
      </div>

      {/* Status text */}
      <div className="text-center text-sm">
        <div className="text-text-secondary">
          {valueTsp <= 3 && '✓ Within daily limit'}
          {valueTsp > 3 && valueTsp <= 5 && '⚠️ Approaching limit'}
          {valueTsp > 5 && '⛔ Exceeds daily limit'}
        </div>
        <div className="text-text-secondary text-xs mt-1">
          of {maxTsp.toFixed(1)} tsp (WHO recommended)
        </div>
      </div>
    </div>
  );
};

export default SugarMeter;
