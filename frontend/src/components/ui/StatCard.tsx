import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: number;
  trendLabel?: string;
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  trendLabel,
  icon,
  color = 'blue',
  loading = false
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      light: 'bg-blue-50',
      text: 'text-blue-600'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-500 to-green-600',
      light: 'bg-green-50',
      text: 'text-green-600'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      light: 'bg-purple-50',
      text: 'text-purple-600'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      light: 'bg-orange-50',
      text: 'text-orange-600'
    },
    red: {
      bg: 'bg-gradient-to-br from-red-500 to-red-600',
      light: 'bg-red-50',
      text: 'text-red-600'
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {(change !== undefined || trend !== undefined) && (
            <div className="flex items-center space-x-1">
              <span
                className={`text-sm font-medium ${
                  (change || trend || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {(change || trend || 0) >= 0 ? '+' : ''}{change || trend}%
              </span>
              <span className="text-xs text-gray-500">{trendLabel || 'vs last month'}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 ${colorClasses[color].bg} rounded-xl flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};
