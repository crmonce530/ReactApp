import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  color: string;
  icon?: React.ReactNode;
}

interface AnimatedStatsProps {
  stats: StatItem[];
  layout?: 'grid' | 'list';
  showProgress?: boolean;
}

const AnimatedStats: React.FC<AnimatedStatsProps> = ({ 
  stats, 
  layout = 'grid',
  showProgress = false 
}) => {
  const [isInView, setIsInView] = useState(false);

  const StatCounter: React.FC<{ value: number; suffix?: string; prefix?: string }> = ({ 
    value, 
    suffix = '', 
    prefix = '' 
  }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
      if (isInView) {
        const animation = animate(count, value, { duration: 2, ease: "easeOut" });
        return animation.stop;
      }
    }, [isInView, value]);

    return (
      <motion.span className="text-3xl md:text-4xl font-bold">
        {prefix}{rounded.get()}{suffix}
      </motion.span>
    );
  };

  const ProgressBar: React.FC<{ value: number; color: string }> = ({ value, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
      <motion.div
        className={`h-2 rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </div>
  );

  if (layout === 'list') {
    return (
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            onViewportEnter={() => setIsInView(true)}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              {stat.icon && (
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  {stat.icon}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{stat.label}</h3>
                {showProgress && <ProgressBar value={stat.value} color={stat.color} />}
              </div>
            </div>
            <div className="text-right">
              <StatCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsInView(true)}
          className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100 card-hover"
        >
          {stat.icon && (
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${stat.color}`}>
              {stat.icon}
            </div>
          )}
          <StatCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
          <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
          {showProgress && <ProgressBar value={stat.value} color={stat.color} />}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedStats; 