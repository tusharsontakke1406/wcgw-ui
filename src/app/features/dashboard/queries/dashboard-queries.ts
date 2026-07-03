import { Injectable, signal } from '@angular/core';
import { TanStackQueryService } from '@tanstack/query-angular';
import { ApiService } from '../../../core/api/api.service';
import { RiskKPI } from '../models/risk-kpi.model';
import { EngagementFeedItem } from '../models/engagement-feed.model';
@Injectable({ providedIn: 'root' })
export class DashboardQueries {
  kpiQuery = this.queryService.createQuery<RiskKPI>({
    queryKey: ['riskKPI'],
    queryFn: () => this.api.getRiskKPI()
  });
  engagementFeedQuery = this.queryService.createQuery<EngagementFeedItem[]>({
    queryKey: ['engagementFeed'],
    queryFn: () => this.api.getEngagementFeed()
  });
  constructor(
    private queryService: TanStackQueryService,
    private api: ApiService
  ) {}
}