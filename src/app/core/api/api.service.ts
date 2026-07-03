import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RiskKPI } from '../../features/dashboard/models/risk-kpi.model';
import { EngagementFeedItem } from '../../features/dashboard/models/engagement-feed.model';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  getRiskKPI(): Observable<RiskKPI> {
    return this.http.get<RiskKPI>('/api/dashboard/kpi');
  }
  getEngagementFeed(): Observable<EngagementFeedItem[]> {
    return this.http.get<EngagementFeedItem[]>('/api/dashboard/engagement-feed');
  }
}