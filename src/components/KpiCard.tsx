import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </h3>
          <div className="mt-2">
            <p className="text-3xl font-bold text-gray-900">
              {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(2) : value}
            </p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span className="font-medium">
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <svg 
              className={`w-4 h-4 ml-1 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}; 