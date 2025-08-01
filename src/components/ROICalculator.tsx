import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Users,
  Target,
  ArrowRight
} from 'lucide-react';

const ROICalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    teamSize: 10,
    avgDealSize: 5000,
    dealsPerMonth: 20,
    currentConversionRate: 15
  });

  const handleInputChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate ROI improvements
  const currentRevenue = formData.avgDealSize * formData.dealsPerMonth * (formData.currentConversionRate / 100);
  const improvedConversionRate = formData.currentConversionRate * 1.4; // 40% improvement
  const improvedRevenue = formData.avgDealSize * formData.dealsPerMonth * (improvedConversionRate / 100);
  const revenueIncrease = improvedRevenue - currentRevenue;
  const timeSaved = formData.teamSize * 20; // 20 hours per person saved
  const costSavings = timeSaved * 50; // $50/hour average rate

  const totalROI = revenueIncrease + costSavings;
  const monthlySavings = totalROI;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calculator size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Calculate Your ROI
        </h2>
        <p className="text-xl text-gray-600">
          See how much CRMONCE can save your business
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Business Metrics</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Size
              </label>
              <div className="flex items-center space-x-2">
                <Users size={20} className="text-gray-400" />
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={formData.teamSize}
                  onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-gray-900 min-w-[3rem]">
                  {formData.teamSize}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Deal Size ($)
              </label>
              <div className="flex items-center space-x-2">
                <DollarSign size={20} className="text-gray-400" />
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={formData.avgDealSize}
                  onChange={(e) => handleInputChange('avgDealSize', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-gray-900 min-w-[5rem]">
                  ${formData.avgDealSize.toLocaleString()}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deals per Month
              </label>
              <div className="flex items-center space-x-2">
                <Target size={20} className="text-gray-400" />
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={formData.dealsPerMonth}
                  onChange={(e) => handleInputChange('dealsPerMonth', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-gray-900 min-w-[3rem]">
                  {formData.dealsPerMonth}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Conversion Rate (%)
              </label>
              <div className="flex items-center space-x-2">
                <TrendingUp size={20} className="text-gray-400" />
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={formData.currentConversionRate}
                  onChange={(e) => handleInputChange('currentConversionRate', parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-gray-900 min-w-[3rem]">
                  {formData.currentConversionRate}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Potential Savings</h3>
          
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Monthly Revenue Increase</span>
                <DollarSign size={20} className="text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-600">
                +${revenueIncrease.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                From {formData.currentConversionRate}% to {improvedConversionRate.toFixed(1)}% conversion rate
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Time Saved Monthly</span>
                <Clock size={20} className="text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {timeSaved} hours
              </div>
              <div className="text-sm text-gray-500">
                Automated workflows save {formData.teamSize * 2} hours per person
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Cost Savings</span>
                <DollarSign size={20} className="text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-600">
                ${costSavings.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">
                Based on $50/hour average team cost
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/90">Total Monthly ROI</span>
                <TrendingUp size={20} className="text-white" />
              </div>
              <div className="text-3xl font-bold">
                ${totalROI.toLocaleString()}
              </div>
              <div className="text-sm text-white/80">
                ${yearlySavings.toLocaleString()} annually
              </div>
            </motion.div>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full bg-white hover:bg-gray-50 text-primary-600 font-semibold py-4 px-6 rounded-xl border-2 border-primary-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator; 