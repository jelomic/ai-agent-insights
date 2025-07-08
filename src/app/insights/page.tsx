'use client';

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { conversationStore } from '@/store/ConversationStore';
import { KpiCard } from '@/components/KpiCard';
import { FilterBar } from '@/components/FilterBar';
import { StatusChart } from '@/components/StatusChart';

const InsightsPage: React.FC = observer(() => {
  useEffect(() => {
    conversationStore.loadConversations();
  }, []);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round((seconds % 60) * 100) / 100; // Round to 2 decimal places
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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading conversation data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Conversation Insights</h1>
          <p className="text-gray-600 mt-2">
            Analytics dashboard for AI agent call performance and metrics
          </p>
        </div>

        {/* Filters */}
        <FilterBar />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="Total Calls"
            value={conversationStore.totalCalls}
            subtitle="Filtered conversations"
          />
          <KpiCard
            title="Success Rate"
            value={`${conversationStore.callSuccessRate.toFixed(1)}%`}
            subtitle="Successful calls"
          />
          <KpiCard
            title="Avg Duration"
            value={formatDuration(conversationStore.averageCallDuration)}
            subtitle="Per call"
          />
          <KpiCard
            title="Total Cost"
            value={formatCost(conversationStore.totalCost)}
            subtitle="USD"
          />
        </div>

        {/* Additional Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <KpiCard
            title="Avg LLM Latency"
            value={formatLatency(conversationStore.averageLLMLatency)}
            subtitle="Response time"
          />
           <KpiCard
            title="Avg TTS Latency"
            value={formatLatency(conversationStore.averageTTSLatency)}
            subtitle="Response time"
          />
          <KpiCard
            title="Avg Interruptions"
            value={conversationStore.averageInterruptions.toFixed(1)}
            subtitle="Per call"
          />   
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusChart />
          
          {/* Calls Table */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Calls</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {conversationStore.filteredConversations
                    .sort((a, b) => b.startTime - a.startTime) // Sort by start time (most recent first)
                    .slice(0, 5)
                    .map((conversation) => (
                    <tr key={conversation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {conversation.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {conversation.agent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDuration(conversation.duration)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCost(conversation.cost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {conversationStore.filteredConversations.length === 0 && (
              <p className="text-gray-500 text-center py-4">No calls match the current filters</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default InsightsPage; 