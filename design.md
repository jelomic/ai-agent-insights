# Conversation Insights - Design Document

## Part 1: Metrics, Filters, Visualization & Ideas

### Top 7 Metrics (Derived from Conversation Schema)

1. **Total Calls**
   - *Definition*: Count of all conversations in the selected period
   - *Business Value*: Overall call volume and activity level
   - *Formula*: `COUNT(conversations)`

2. **Call Success Rate**
   - *Definition*: Percentage of calls with status = 'success'
   - *Business Value*: AI agent effectiveness and call completion quality
   - *Formula*: `(COUNT(successful_calls) / COUNT(total_calls)) * 100`

3. **Average Call Duration**
   - *Definition*: Mean duration of all calls in seconds/minutes
   - *Business Value*: Efficiency metrics and cost optimization
   - *Formula*: `AVG(duration)`

4. **Total Cost**
   - *Definition*: Sum of all call costs in USD
   - *Business Value*: Budget tracking and cost management
   - *Formula*: `SUM(cost)`

5. **Average LLM Latency**
   - *Definition*: Mean response time for LLM processing in milliseconds
   - *Business Value*: AI performance and user experience quality
   - *Formula*: `AVG(llmLatency)` (for calls with stats)

6. **Average Interruptions per Call**
   - *Definition*: Mean number of interruptions per conversation
   - *Business Value*: Conversation flow quality and user satisfaction
   - *Formula*: `AVG(interruptions)` (for calls with stats)

7. **Call Distribution by Status**
   - *Definition*: Breakdown of calls by each status (success, busy, transfer, etc.)
   - *Business Value*: Understanding call outcomes and failure patterns
   - *Formula*: `GROUP BY status`

---

### Filters for Data Slicing

| Filter | Type | Description | Business Use |
|--------|------|-------------|--------------|
| **Date/Time Range** | Date picker | Filter by `startTime` | Trend analysis, period comparison |
| **Agent** | Dropdown | Filter by specific `agent` | Agent performance comparison |
| **Call Type** | Dropdown | `inbound`/`outbound`/all | Campaign analysis, call direction |
| **Call Status** | Multi-select | `success`/`busy`/`transfer`/`no_answer`/`dropped` | Outcome analysis |
| **Caller/Callee** | Text search | Search in phone numbers | Customer journey tracking |
| **Duration Range** | Slider | Min/max call duration | Performance optimization |
| **Cost Range** | Slider | Min/max call cost | Budget analysis |

---

### Visualization Recommendations

| Metric | Primary Chart | Secondary Chart | KPI Card | Table |
|--------|---------------|-----------------|----------|-------|
| **Total Calls** | - | - | ✅ | ✅ |
| **Call Success Rate** | Trend line | - | ✅ | ✅ |
| **Average Call Duration** | Histogram/Bar | - | ✅ | ✅ |
| **Total Cost** | Trend line | - | ✅ | ✅ |
| **Average LLM Latency** | Line chart | - | ✅ | ✅ |
| **Average Interruptions** | Bar chart | - | ✅ | ✅ |
| **Call Distribution by Status** | Pie/Donut chart | Stacked bar | - | ✅ |

**Chart Type Details:**
- **KPI Cards**: Primary metric display with large numbers
- **Trend Lines**: Time-series data for performance tracking
- **Bar Charts**: Categorical data comparison
- **Pie/Donut Charts**: Proportional breakdowns
- **Tables**: Detailed data with sorting/filtering

---

### Additional Ideas for Accessibility & Actionability

#### **Export & Data Access**
- **CSV/Excel Export**: Download filtered data for further analysis
- **PDF Reports**: Scheduled or on-demand report generation
- **API Access**: REST endpoints for external integrations

#### **Drill-down Capabilities**
- **Click-to-Detail**: Click any metric to see underlying conversations
- **Conversation Details**: Modal/sidebar with full call information
- **Agent Comparison**: Side-by-side agent performance views

#### **Smart Alerts & Insights**
- **Anomaly Detection**: Highlight unusual spikes or drops
- **Trend Alerts**: Notify when metrics cross thresholds
- **Performance Insights**: AI-generated recommendations

#### **Comparison Features**
- **Period Comparison**: This week vs last week, this month vs last month
- **Agent Benchmarking**: Compare individual agents to team averages
- **Goal Tracking**: Set targets and track progress

#### **Quick Actions**
- **Preset Filters**: "Last 7 days", "This month", "High-cost calls"
- **Saved Views**: User-defined filter combinations
- **One-click Filters**: Common filter combinations

#### **Enhanced UX**
- **Tooltips**: Explain metrics and calculations on hover
- **Mobile Optimization**: Responsive design for field use
- **Loading States**: Skeleton screens and progress indicators
- **Error Handling**: Graceful handling of data issues

#### **Advanced Analytics**
- **Predictive Insights**: Forecast trends based on historical data
- **Correlation Analysis**: Identify relationships between metrics
- **A/B Testing**: Compare different agent configurations

#### **Operational Features**
- **Real-time Updates**: Live data refresh for active monitoring
- **Notification Center**: Alerts for important events
- **User Permissions**: Role-based access to different metrics
- **Audit Trail**: Track who viewed what data when

---

### Implementation Priority

**Phase 1 (MVP - Current Implementation):**
- 7 core metrics as KPI cards
- Basic filtering (date, agent, type, status)
- Status distribution chart
- Simple table view

**Phase 2 (Enhanced):**
- Advanced filtering (duration, cost ranges)
- Trend charts and time-series data
- Export functionality
- Mobile optimization

**Phase 3 (Advanced):**
- Predictive analytics
- Real-time updates
- Advanced visualizations
- Custom dashboards

---

### Success Metrics

**User Engagement:**
- Dashboard usage frequency
- Filter interaction rates
- Export/download activity

**Business Impact:**
- Time saved in reporting
- Improved decision-making speed
- Cost optimization through insights

**Technical Performance:**
- Page load times
- API response times
- Mobile usability scores 