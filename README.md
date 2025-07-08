# Conversation Insights Dashboard

A Next.js + TypeScript + MobX State Tree analytics dashboard for AI agent call performance and metrics.

## Features

- **7 Key Metrics**: Total calls, success rate, average duration, total cost, LLM latency, interruptions, and status distribution
- **Advanced Filtering**: Date range, agent, call type, status, caller/callee search, duration and cost ranges
- **Real-time Updates**: Reactive UI with MobX state management
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Mock Data API**: Simulated conversation data for testing

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **MobX State Tree** (State management)
- **Tailwind CSS** (Styling)
- **React** (UI framework)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd conversation-insights
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

The app will automatically redirect to `/insights` where you can view the dashboard.

## Project Structure

```
src/
├── app/
│   ├── api/conversations/route.ts    # Mock data API endpoint
│   ├── insights/page.tsx             # Main dashboard page
│   └── page.tsx                     # Home page (redirects to insights)
├── components/
│   ├── FilterBar.tsx                # Filter controls
│   ├── KpiCard.tsx                  # Metric display cards
│   └── StatusChart.tsx              # Status distribution chart
└── store/
    └── ConversationStore.ts          # MobX store with metrics and filters
```

## API Endpoints

### GET `/api/conversations`

Returns mock conversation data matching the schema:

```typescript
interface Conversation {
  id: string;
  agent: string;
  startTime: number;
  duration: number;
  cost: number;
  status: 'busy'|'success'|'transfer'|'no_answer'|'dropped';
  callInfo: {
    caller: string;
    callee: string;
    type: 'inbound'|'outbound';
    stats?: {
      llmLatency: number;
      ttsLatency: number;
      interruptions: number;
    };
  };
}
```

## Metrics Implemented

1. **Total Calls** - Count of filtered conversations
2. **Call Success Rate** - Percentage of successful calls
3. **Average Call Duration** - Mean duration in minutes/seconds
4. **Total Cost** - Sum of all call costs in USD
5. **Average LLM Latency** - Mean response time in milliseconds
6. **Average Interruptions** - Mean interruptions per call
7. **Call Distribution by Status** - Breakdown by call status

## Filters Available

- **Date Range** - Filter by start/end dates
- **Agent** - Filter by specific AI agent
- **Call Type** - Inbound/Outbound/All
- **Status** - Success/Busy/Transfer/No Answer/Dropped/All
- **Caller/Callee** - Text search in phone numbers
- **Duration Range** - Min/max call duration
- **Cost Range** - Min/max call cost

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Adding New Metrics

1. Add computed property to `ConversationStore`
2. Create new KPI card or chart component
3. Add to the insights page layout

### Adding New Filters

1. Add filter property to `Filters` interface
2. Add filter logic to `filteredConversations` getter
3. Add filter control to `FilterBar` component
4. Add setter action to store

### Styling

The app uses Tailwind CSS. Customize styles in:
- `tailwind.config.js` - Theme configuration
- Component files - Inline Tailwind classes

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests if applicable
5. Submit pull request

## License

MIT License - see LICENSE file for details
