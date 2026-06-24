import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DashboardQueries } from '../queries/dashboard-queries';
import { KpiCardComponent } from '../../../shared/components/kpi-card/kpi-card.component';
import { EchartsWrapperComponent } from '../../../shared/charts/echarts-wrapper.component';
import { selectedFeedItemSignal } from '../state/dashboard-signals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [KpiCardComponent, EchartsWrapperComponent]
})
export class DashboardComponent {
  private queries = inject(DashboardQueries);

  kpi$ = this.queries.kpiQuery.data$;
  engagementFeed$ = this.queries.engagementFeedQuery.data$;
  selectedFeedItem = selectedFeedItemSignal;

  selectFeedItem(item: any) {
    selectedFeedItemSignal.set(item);
  }
}