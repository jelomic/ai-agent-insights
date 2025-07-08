import { makeAutoObservable, runInAction } from 'mobx';

export interface Conversation {
  id: string;
  agent: string;
  startTime: number;
  duration: number;
  cost: number;
  status: 'busy' | 'success' | 'transfer' | 'no_answer' | 'dropped';
  callInfo: {
    caller: string;
    callee: string;
    type: 'inbound' | 'outbound';
    stats?: {
      llmLatency: number;
      ttsLatency: number;
      interruptions: number;
    };
  };
}

export interface Filters {
  dateRange: {
    start: number;
    end: number;
  };
  agent: string;
  callType: 'all' | 'inbound' | 'outbound';
  status: 'all' | 'busy' | 'success' | 'transfer' | 'no_answer' | 'dropped';
  caller: string;
  callee: string;
  durationRange: {
    min: number;
    max: number;
  };
  costRange: {
    min: number;
    max: number;
  };
}

export class ConversationStore {
  conversations: Conversation[] = [];
  filters: Filters = {
    dateRange: {
      start: Date.now() - 30 * 24 * 60 * 60 * 1000, // Last 30 days
      end: Date.now(), // Today
    },
    agent: '',
    callType: 'all',
    status: 'all',
    caller: '',
    callee: '',
    durationRange: {
      min: 0,
      max: 3600, // 1 hour
    },
    costRange: {
      min: 0,
      max: 100, // $100
    },
  };
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Filtered conversations based on current filters
  get filteredConversations(): Conversation[] {
    return this.conversations.filter((conversation) => {
      // Date range filter
      if (conversation.startTime < this.filters.dateRange.start || 
          conversation.startTime > this.filters.dateRange.end) {
        return false;
      }

      // Agent filter
      if (this.filters.agent && conversation.agent !== this.filters.agent) {
        return false;
      }

      // Call type filter
      if (this.filters.callType !== 'all' && conversation.callInfo.type !== this.filters.callType) {
        return false;
      }

      // Status filter
      if (this.filters.status !== 'all' && conversation.status !== this.filters.status) {
        return false;
      }

      // Caller filter
      if (this.filters.caller && !conversation.callInfo.caller.includes(this.filters.caller)) {
        return false;
      }

      // Callee filter
      if (this.filters.callee && !conversation.callInfo.callee.includes(this.filters.callee)) {
        return false;
      }

      // Duration range filter
      if (conversation.duration < this.filters.durationRange.min || 
          conversation.duration > this.filters.durationRange.max) {
        return false;
      }

      // Cost range filter
      if (conversation.cost < this.filters.costRange.min || 
          conversation.cost > this.filters.costRange.max) {
        return false;
      }

      return true;
    });
  }

  // Metric 1: Total Calls
  get totalCalls(): number {
    return this.filteredConversations.length;
  }

  // Metric 2: Call Success Rate
  get callSuccessRate(): number {
    const total = this.filteredConversations.length;
    if (total === 0) return 0;
    const successful = this.filteredConversations.filter(c => c.status === 'success').length;
    return (successful / total) * 100;
  }

  // Metric 3: Average Call Duration
  get averageCallDuration(): number {
    const total = this.filteredConversations.length;
    if (total === 0) return 0;
    const totalDuration = this.filteredConversations.reduce((sum, c) => sum + c.duration, 0);
    return totalDuration / total;
  }

  // Metric 4: Total Cost
  get totalCost(): number {
    return this.filteredConversations.reduce((sum, c) => sum + c.cost, 0);
  }

  // Metric 5: Average LLM Latency
  get averageLLMLatency(): number {
    const callsWithStats = this.filteredConversations.filter(c => c.callInfo.stats?.llmLatency);
    if (callsWithStats.length === 0) return 0;
    const totalLatency = callsWithStats.reduce((sum, c) => sum + (c.callInfo.stats?.llmLatency || 0), 0);
    return totalLatency / callsWithStats.length;
  }

  // Metric 5.5: Average TTS Latency
  get averageTTSLatency(): number {
    const callsWithStats = this.filteredConversations.filter(c => c.callInfo.stats?.ttsLatency);
    if (callsWithStats.length === 0) return 0;
    const totalLatency = callsWithStats.reduce((sum, c) => sum + (c.callInfo.stats?.ttsLatency || 0), 0);
    return totalLatency / callsWithStats.length;
  }

  // Metric 6: Average Interruptions per Call
  get averageInterruptions(): number {
    const callsWithStats = this.filteredConversations.filter(c => c.callInfo.stats?.interruptions !== undefined);
    if (callsWithStats.length === 0) return 0;
    const totalInterruptions = callsWithStats.reduce((sum, c) => sum + (c.callInfo.stats?.interruptions || 0), 0);
    return totalInterruptions / callsWithStats.length;
  }

  // Metric 7: Call Distribution by Status
  get callDistributionByStatus(): Record<string, number> {
    const distribution: Record<string, number> = {};
    this.filteredConversations.forEach(conversation => {
      distribution[conversation.status] = (distribution[conversation.status] || 0) + 1;
    });
    return distribution;
  }

  // Additional computed properties
  get uniqueAgents(): string[] {
    return [...new Set(this.conversations.map(c => c.agent))];
  }

  get dateRange(): { min: number; max: number } {
    const timestamps = this.conversations.map(c => c.startTime);
    return {
      min: Math.min(...timestamps),
      max: Math.max(...timestamps),
    };
  }

  // Actions
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  setDateRange(start: number, end: number) {
    this.filters.dateRange.start = start;
    this.filters.dateRange.end = end;
  }

  setAgent(agent: string) {
    this.filters.agent = agent;
  }

  setCallType(callType: 'all' | 'inbound' | 'outbound') {
    this.filters.callType = callType;
  }

  setStatus(status: 'all' | 'busy' | 'success' | 'transfer' | 'no_answer' | 'dropped') {
    this.filters.status = status;
  }

  setCaller(caller: string) {
    this.filters.caller = caller;
  }

  setCallee(callee: string) {
    this.filters.callee = callee;
  }

  setDurationRange(min: number, max: number) {
    this.filters.durationRange.min = min;
    this.filters.durationRange.max = max;
  }

  setCostRange(min: number, max: number) {
    this.filters.costRange.min = min;
    this.filters.costRange.max = max;
  }

  async loadConversations() {
    this.setLoading(true);
    try {
      const response = await fetch('/api/conversations');
      const data = await response.json();
      runInAction(() => {
        this.conversations = data;
      });
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      this.setLoading(false);
    }
  }
}

// Create and export a singleton instance
export const conversationStore = new ConversationStore(); 