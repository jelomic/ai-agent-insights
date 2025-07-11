'use client';

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { conversationStore } from '@/store/ConversationStore';
import { KpiCard } from '@/components/KpiCard';
import { FilterBar } from '@/components/FilterBar';
import { StatusChart } from '@/components/StatusChart';
import { 
  PhoneIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  BoltIcon,
  SpeakerWaveIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const InsightsPage: React.FC = observer(() => {
  useEffect(() => {
    conversationStore.loadConversations();
  }, []);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round((seconds % 60) * 100) / 100;
    return `${minutes}m ${remainingSeconds.toFixed(2)}s`;
  };

  const formatCost = (cost: number) => {
    return `$${Math.round(cost * 100) / 100}`;
  };

  const formatLatency = (ms: number) => {
    return `${ms.toFixed(0)}ms`;
  };

  if (conversationStore.loading) {
    return (
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading conversation data...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait while we fetch your analytics</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <PhoneIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Conversation Insights</h1>
              <p className="text-lg text-gray-600 mt-1">
                AI Agent Platform Analytics Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Last updated: {new Date().toLocaleString()}</span>
            <span>•</span>
            <span>{conversationStore.filteredConversations.length} conversations analyzed</span>
          </div>
        </div>

        {/* Filters */}
        <FilterBar />

        {/* Primary KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="Total Calls"
            value={conversationStore.totalCalls}
            subtitle="Filtered conversations"
            icon={PhoneIcon}
            color="blue"
            trend={{ value: 12.5, isPositive: true }}
          />
          <KpiCard
            title="Success Rate"
            value={`${conversationStore.callSuccessRate.toFixed(1)}%`}
            subtitle="Successful calls"
            icon={CheckCircleIcon}
            color="green"
            trend={{ value: 8.2, isPositive: true }}
          />
          <KpiCard
            title="Avg Duration"
            value={formatDuration(conversationStore.averageCallDuration)}
            subtitle="Per call"
            icon={ClockIcon}
            color="purple"
            trend={{ value: -3.1, isPositive: false }}
          />
          <KpiCard
            title="Total Cost"
            value={formatCost(conversationStore.totalCost)}
            subtitle="USD"
            icon={CurrencyDollarIcon}
            color="indigo"
            trend={{ value: 15.7, isPositive: true }}
          />
        </div>

        {/* Secondary Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <KpiCard
            title="Avg LLM Latency"
            value={formatLatency(conversationStore.averageLLMLatency)}
            subtitle="Response time"
            icon={BoltIcon}
            color="yellow"
            trend={{ value: -5.2, isPositive: true }}
          />
          <KpiCard
            title="Avg TTS Latency"
            value={formatLatency(conversationStore.averageTTSLatency)}
            subtitle="Response time"
            icon={SpeakerWaveIcon}
            color="red"
            trend={{ value: 2.1, isPositive: false }}
          />
          <KpiCard
            title="Avg Interruptions"
            value={conversationStore.averageInterruptions.toFixed(1)}
            subtitle="Per call"
            icon={ExclamationTriangleIcon}
            color="yellow"
            trend={{ value: -1.8, isPositive: true }}
          />   
        </div>

        {/* Charts and Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusChart />
          
          {/* Enhanced Calls Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <PhoneIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Calls</h3>
                  <p className="text-sm text-gray-500">Latest conversation activity</p>
                </div>
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agent
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {conversationStore.filteredConversations
                    .sort((a, b) => b.startTime - a.startTime)
                    .slice(0, 5)
                    .map((conversation) => (
                    <tr key={conversation.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {conversation.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {conversation.agent}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          conversation.status === 'success' ? 'bg-green-100 text-green-800' :
                          conversation.status === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                          conversation.status === 'transfer' ? 'bg-blue-100 text-blue-800' :
                          conversation.status === 'no_answer' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {conversation.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDuration(conversation.duration)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCost(conversation.cost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {conversationStore.filteredConversations.length === 0 && (
              <div className="text-center py-8">
                <PhoneIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No calls match the current filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default InsightsPage; 