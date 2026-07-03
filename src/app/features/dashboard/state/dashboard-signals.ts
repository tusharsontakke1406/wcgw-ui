import { signal } from '@angular/core';
import { RiskKPI } from '../models/risk-kpi.model';
import { EngagementFeedItem } from '../models/engagement-feed.model';
export const selectedFeedItemSignal = signal<EngagementFeedItem | null>(null);