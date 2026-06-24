export interface EngagementFeedItem {
  entityId: string;
  entityName: string;
  riskScore: number;
  priority: 'High' | 'Medium' | 'Low';
  lastUpdated: string;
  summary: string;
}