import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { conversationStore } from '@/store/ConversationStore';
import { 
  FunnelIcon, 
  CalendarIcon, 
  UserIcon, 
  PhoneIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export const FilterBar: React.FC = observer(() => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const resetFilters = () => {
    conversationStore.resetFilters();
  };

  const activeFiltersCount = [
    conversationStore.filters.agent !== '',
    conversationStore.filters.callType !== 'all',
    conversationStore.filters.status !== 'all',
    conversationStore.filters.caller !== '',
    conversationStore.filters.callee !== ''
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FunnelIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <p className="text-sm text-gray-500">
                {conversationStore.filteredConversations.length} conversations match your criteria
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {activeFiltersCount > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {activeFiltersCount} active
              </span>
            )}
            <button
              onClick={resetFilters}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <ArrowPathIcon className="w-4 h-4 mr-1" />
              Reset
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1 text-gray-400" />
              Date Range
            </label>
            <div className="space-y-2">
              <input
                type="date"
                value={formatDate(conversationStore.filters.dateRange.start)}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                placeholder={getDefaultDateRange().start}
              />
              <input
                type="date"
                value={formatDate(conversationStore.filters.dateRange.end)}
                onChange={(e) => handleDateChange('end', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                placeholder={getDefaultDateRange().end}
              />
            </div>
          </div>

          {/* Agent */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <UserIcon className="w-4 h-4 mr-1 text-gray-400" />
              Agent
            </label>
            <select
              value={conversationStore.filters.agent}
              onChange={(e) => conversationStore.setAgent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            >
              <option value="">All Agents</option>
              {conversationStore.uniqueAgents
                .sort((a, b) => {
                  const numA = parseInt(a.replace('agent_', ''));
                  const numB = parseInt(b.replace('agent_', ''));
                  return numA - numB;
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
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <PhoneIcon className="w-4 h-4 mr-1 text-gray-400" />
              Call Type
            </label>
            <select
              value={conversationStore.filters.callType}
              onChange={(e) => conversationStore.setCallType(e.target.value as 'all' | 'inbound' | 'outbound')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
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

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
            {/* Caller */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MagnifyingGlassIcon className="w-4 h-4 mr-1 text-gray-400" />
                Caller (Search)
              </label>
              <input
                type="text"
                value={conversationStore.filters.caller}
                onChange={(e) => conversationStore.setCaller(e.target.value)}
                placeholder="Search by caller number..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              />
            </div>

            {/* Callee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MagnifyingGlassIcon className="w-4 h-4 mr-1 text-gray-400" />
                Callee (Search)
              </label>
              <input
                type="text"
                value={conversationStore.filters.callee}
                onChange={(e) => conversationStore.setCallee(e.target.value)}
                placeholder="Search by callee number..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}); 