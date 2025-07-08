import React from 'react';
import { observer } from 'mobx-react-lite';
import { conversationStore } from '@/store/ConversationStore';

export const FilterBar: React.FC = observer(() => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toISOString().split('T')[0];
  };

  const getDefaultDateRange = () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return {
      start: thirtyDaysAgo.toISOString().split('T')[0],
      end: now.toISOString().split('T')[0]
    };
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    const timestamp = new Date(value).getTime();
    if (field === 'start') {
      conversationStore.setDateRange(timestamp, conversationStore.filters.dateRange.end);
    } else {
      conversationStore.setDateRange(conversationStore.filters.dateRange.start, timestamp);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={formatDate(conversationStore.filters.dateRange.start)}
              onChange={(e) => handleDateChange('start', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder={getDefaultDateRange().start}
            />
            <input
              type="date"
              value={formatDate(conversationStore.filters.dateRange.end)}
              onChange={(e) => handleDateChange('end', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder={getDefaultDateRange().end}
            />
          </div>
        </div>

        {/* Agent */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agent
          </label>
          <select
            value={conversationStore.filters.agent}
            onChange={(e) => conversationStore.setAgent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="">All Agents</option>
            {conversationStore.uniqueAgents
              .sort((a, b) => {
                // Extract numbers from agent IDs (e.g., "agent_1" -> 1, "agent_10" -> 10)
                const numA = parseInt(a.replace('agent_', ''));
                const numB = parseInt(b.replace('agent_', ''));
                return numA - numB; // Sort in ascending order
              })
              .map((agent) => (
                <option key={agent} value={agent}>
                  {agent}
                </option>
              ))}
          </select>
        </div>

        {/* Call Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Call Type
          </label>
          <select
            value={conversationStore.filters.callType}
            onChange={(e) => conversationStore.setCallType(e.target.value as 'all' | 'inbound' | 'outbound')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="all">All Types</option>
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={conversationStore.filters.status}
            onChange={(e) => conversationStore.setStatus(e.target.value as 'all' | 'busy' | 'success' | 'transfer' | 'no_answer' | 'dropped')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="busy">Busy</option>
            <option value="transfer">Transfer</option>
            <option value="no_answer">No Answer</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>
      </div>

      {/* Additional filters row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Caller */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Caller (Search)
          </label>
          <input
            type="text"
            value={conversationStore.filters.caller}
            onChange={(e) => conversationStore.setCaller(e.target.value)}
            placeholder="Search by caller number..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        {/* Callee */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Callee (Search)
          </label>
          <input
            type="text"
            value={conversationStore.filters.callee}
            onChange={(e) => conversationStore.setCallee(e.target.value)}
            placeholder="Search by callee number..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
      </div>
    </div>
  );
}); 