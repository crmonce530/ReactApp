import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface AnimatedChartProps {
  type: 'bar' | 'line' | 'pie' | 'area';
  data: ChartData[];
  height?: number;
  width?: number;
  title?: string;
}

const AnimatedChart: React.FC<AnimatedChartProps> = ({ 
  type, 
  data, 
  height = 200, 
  width = 400, 
  title 
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  const renderBarChart = () => (
    <div className="flex items-end justify-between h-full space-x-2">
      {data.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: (item.value / maxValue) * 100, opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className="flex-1 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg relative"
          style={{ minHeight: '20px' }}
        >
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
            {item.label}
          </div>
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-primary-600">
            {item.value}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderLineChart = () => (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      <motion.path
        d={`M ${data.map((item, index) => 
          `${(index / (data.length - 1)) * width},${height - (item.value / maxValue) * height}`
        ).join(' L ')}`}
        stroke="url(#lineGradient)"
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {data.map((item, index) => (
        <motion.circle
          key={item.label}
          cx={(index / (data.length - 1)) * width}
          cy={height - (item.value / maxValue) * height}
          r="6"
          fill="#3B82F6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        />
      ))}
    </svg>
  );

  const renderPieChart = () => {
    const radius = Math.min(width, height) / 2 - 20;
    const centerX = width / 2;
    const centerY = height / 2;
    
    let currentAngle = 0;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        {data.map((item, index) => {
          const sliceAngle = (item.value / total) * 2 * Math.PI;
          const x1 = centerX + radius * Math.cos(currentAngle);
          const y1 = centerY + radius * Math.sin(currentAngle);
          const x2 = centerX + radius * Math.cos(currentAngle + sliceAngle);
          const y2 = centerY + radius * Math.sin(currentAngle + sliceAngle);
          
          const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
          
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          currentAngle += sliceAngle;
          
          return (
            <motion.path
              key={item.label}
              d={pathData}
              fill={item.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
          );
        })}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.3}
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </svg>
    );
  };

  const renderAreaChart = () => (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <motion.path
        d={`M 0,${height} L ${data.map((item, index) => 
          `${(index / (data.length - 1)) * width},${height - (item.value / maxValue) * height}`
        ).join(' L ')} L ${width},${height} Z`}
        fill="url(#areaGradient)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return renderBarChart();
      case 'line':
        return renderLineChart();
      case 'pie':
        return renderPieChart();
      case 'area':
        return renderAreaChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      <div style={{ height, width: '100%' }}>
        {renderChart()}
      </div>
    </div>
  );
};

export default AnimatedChart; 