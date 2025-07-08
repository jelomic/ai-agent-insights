import React from 'react';
import { observer } from 'mobx-react-lite';
import { conversationStore } from '@/store/ConversationStore';

const statusColors = {
  success: 'bg-green-500',
  busy: 'bg-yellow-500',
  transfer: 'bg-blue-500',
  no_answer: 'bg-gray-500',
  dropped: 'bg-red-500',
};

const statusLabels = {
  success: 'Success',
  busy: 'Busy',
  transfer: 'Transfer',
  no_answer: 'No Answer',
  dropped: 'Dropped',
};

export const StatusChart: React.FC = observer(() => {
  const distribution = conversationStore.callDistributionByStatus;
  const total = conversationStore.totalCalls;

  if (total === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Status Distribution</h3>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Status Distribution</h3>
      
      <div className="space-y-3">
        {Object.entries(distribution).map(([status, count]) => {
          const percentage = ((count / total) * 100).toFixed(1);
          const color = statusColors[status as keyof typeof statusColors] || 'bg-gray-500';
          const label = statusLabels[status as keyof typeof statusLabels] || status;

          return (
            <div key={status} className="flex items-center">
              <div className="flex items-center w-32">
                <div className={`w-3 h-3 rounded-full ${color} mr-2`}></div>
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${color}`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-gray-600 w-16 text-right">
                {count} ({percentage}%)
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Total Calls: {total}</span>
          <span>Success Rate: {conversationStore.callSuccessRate.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}); 