import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StaticDataService } from '../../core/services/static-data.service';
import { EntityStatus, ENTITY_STATUS_LABELS } from '../../core/models/enums/entity-status.enum';
import { ComplianceTag, COMPLIANCE_TAG_LABELS } from '../../core/models/enums/compliance-tag.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container">
      <div class="dash-header">
        <h2>Good morning, Admin</h2>
        
      </div>




  `,
  styles: [`
    .dash-header { margin-bottom: 1.5rem; }
    .dash-header h2 { font-size: 1.75rem; font-weight: 700; color: #0f172a; margin: 0 0 .35rem; }
    .dash-sub { color: #64748b; font-size: .875rem; margin: 0; }
    .dash-sub strong { color: #1e293b; font-weight: 600; }

    .kpi-row { display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
    .kpi-card {
      background: #fff; border: 1px solid #e5e7eb; border-radius: 10px;
      padding: 1.25rem; display: flex; align-items: center; gap: 1rem;
      flex: 1; min-width: 160px; box-shadow: 0 1px 3px rgba(0,0,0,.05);
    }
    .kpi-icon {
      width: 44px; height: 44px; border-radius: 10px; display: flex;
      align-items: center; justify-content: center; flex-shrink: 0;
      svg { width: 20px; height: 20px; }
      &.blue   { background: #eff6ff; color: #2563eb; }
      &.green  { background: #f0fdf4; color: #059669; }
      &.amber  { background: #fffbeb; color: #d97706; }
      &.purple { background: #f5f3ff; color: #7c3aed; }
    }
    .kpi-body { display: flex; flex-direction: column; }
    .kpi-value { font-size: 1.75rem; font-weight: 700; color: #0f172a; line-height: 1; }
    .kpi-label { font-size: .75rem; color: #64748b; margin-top: .25rem; }

    .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .dash-card {
      background: #fff; border: 1px solid #e5e7eb; border-radius: 10px;
      padding: 1.25rem 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,.05);
    }
    .card-title { font-size: .85rem; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #374151; margin: 0 0 1rem; }

    .mini-table { width: 100%; border-collapse: collapse; font-size: .875rem;
      th { text-align: left; color: #64748b; font-weight: 500; padding: .4rem .5rem; border-bottom: 1px solid #f1f5f9; font-size: .75rem; }
      td { padding: .6rem .5rem; border-bottom: 1px solid #f8fafc; }
      tr:last-child td { border-bottom: none; }
    }
    .link { color: #2563eb; text-decoration: none; font-weight: 500; &:hover { text-decoration: underline; } }
    .muted { color: #64748b; }
    .view-all { display: inline-block; margin-top: .75rem; color: #2563eb; font-size: .8rem; text-decoration: none; &:hover { text-decoration: underline; } }

    .status-badge { padding: .15rem .55rem; border-radius: 10px; font-size: .7rem; font-weight: 600;
      &.badge-draft      { background: #fef3c7; color: #92400e; }
      &.badge-pending    { background: #e0f2fe; color: #075985; }
      &.badge-approved   { background: #d1fae5; color: #065f46; }
      &.badge-published  { background: #dcfce7; color: #166534; }
      &.badge-deprecated { background: #fee2e2; color: #991b1b; }
      &.badge-archived   { background: #f1f5f9; color: #475569; }
    }

    .compliance-list { display: flex; flex-direction: column; gap: .6rem; }
    .comp-row { display: flex; align-items: center; gap: .75rem; font-size: .8rem; }
    .comp-label { width: 65px; color: #374151; font-weight: 500; flex-shrink: 0; }
    .comp-bar-wrap { flex: 1; background: #f1f5f9; border-radius: 4px; height: 8px; overflow: hidden; }
    .comp-bar { height: 100%; background: #3b82f6; border-radius: 4px; transition: width .3s; }
    .comp-count { width: 24px; text-align: right; color: #64748b; flex-shrink: 0; }

    @media (max-width: 700px) { .dash-grid { grid-template-columns: 1fr; } }
  `]
})
export class DashboardComponent {
  readonly dataService = inject(StaticDataService);
  readonly statusLabels = ENTITY_STATUS_LABELS;
  readonly complianceLabels: Record<string, string> = COMPLIANCE_TAG_LABELS;

  readonly pendingCount = () =>
    this.dataService.entities().filter(e => e.status === EntityStatus.PENDING_APPROVAL).length;

  readonly recentEntities = () =>
    [...this.dataService.entities()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);

  readonly complianceCounts = () => {
    const counts = new Map<string, number>();
    this.dataService.entities().forEach(e => counts.set(e.complianceTag, (counts.get(e.complianceTag) ?? 0) + 1));
    const total = this.dataService.entityCount();
    return Array.from(counts.entries()).map(([tag, count]) => ({ tag: tag as ComplianceTag, count, pct: total ? (count / total) * 100 : 0 }));
  };

  statusClass(status: EntityStatus): string {
    const map: Record<EntityStatus, string> = {
      [EntityStatus.DRAFT]: 'badge-draft',
      [EntityStatus.PENDING_APPROVAL]: 'badge-pending',
      [EntityStatus.APPROVED]: 'badge-approved',
      [EntityStatus.PUBLISHED]: 'badge-published',
      [EntityStatus.DEPRECATED]: 'badge-deprecated',
      [EntityStatus.ARCHIVED]: 'badge-archived'
    };
    return map[status] ?? '';
  }
}
