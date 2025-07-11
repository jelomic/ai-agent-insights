import React from 'react';
import { observer } from 'mobx-react-lite';
import { conversationStore } from '@/store/ConversationStore';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  ArrowPathIcon, 
  XCircleIcon,
  PhoneXMarkIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const statusConfig = {
  success: {
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    icon: CheckCircleIcon,
    label: 'Success'
  },
  busy: {
    color: 'bg-yellow-500',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    icon: ExclamationTriangleIcon,
    label: 'Busy'
  },
  transfer: {
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    icon: ArrowPathIcon,
    label: 'Transfer'
  },
  no_answer: {
    color: 'bg-gray-500',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-200',
    icon: PhoneXMarkIcon,
    label: 'No Answer'
  },
  dropped: {
    color: 'bg-red-500',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    icon: XCircleIcon,
    label: 'Dropped'
  },
};

export const StatusChart: React.FC = observer(() => {
  const distribution = conversationStore.callDistributionByStatus;
  const total = conversationStore.totalCalls;

  if (total === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gray-50 rounded-lg">
            <ChartBarIcon className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Call Status Distribution</h3>
            <p className="text-sm text-gray-500">Real-time call outcome analytics</p>
          </div>
        </div>
        <div className="text-center py-8">
          <ChartBarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No data available for the selected filters</p>
        </div>
      </div>
    );
  }

  const sortedDistribution = Object.entries(distribution)
    .sort(([,a], [,b]) => b - a); // Sort by count descending

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <ChartBarIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Call Status Distribution</h3>
            <p className="text-sm text-gray-500">Real-time call outcome analytics</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{total}</div>
          <div className="text-sm text-gray-500">Total Calls</div>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedDistribution.map(([status, count]) => {
          const percentage = ((count / total) * 100);
          const config = statusConfig[status as keyof typeof statusConfig];
          const Icon = config.icon;

          return (
            <div key={status} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`p-1.5 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
                    <Icon className={`w-4 h-4 ${config.textColor}`} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{config.label}</span>
                    <div className="text-xs text-gray-500">{count} calls</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{percentage.toFixed(1)}%</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${config.color}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-lg font-bold text-green-700">
              {conversationStore.callSuccessRate.toFixed(1)}%
            </div>
            <div className="text-xs text-green-600">Success Rate</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-lg font-bold text-blue-700">
              {((distribution.transfer || 0) / total * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-blue-600">Transfer Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}); 