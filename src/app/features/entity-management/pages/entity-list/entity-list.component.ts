import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StaticDataService } from '../../../../core/services/static-data.service';
import { RiskEntity } from '../../../../core/models/risk-entity.model';
import { EntityStatus, ENTITY_STATUS_LABELS } from '../../../../core/models/enums/entity-status.enum';
import { ComplianceTag, COMPLIANCE_TAG_LABELS } from '../../../../core/models/enums/compliance-tag.enum';

@Component({
  selector: 'app-entity-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent {
  private dataService = inject(StaticDataService);

  searchTerm = signal('');
  filterStatus = signal<EntityStatus | ''>('');
  filterCompliance = signal<ComplianceTag | ''>('');

  readonly statusOptions = Object.values(EntityStatus);
  readonly complianceOptions = Object.values(ComplianceTag);
  readonly statusLabels = ENTITY_STATUS_LABELS;
  readonly complianceLabels = COMPLIANCE_TAG_LABELS;

  readonly filteredEntities = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const status = this.filterStatus();
    const compliance = this.filterCompliance();
    return this.dataService.entities().filter(e => {
      const matchesSearch = !term || e.name.toLowerCase().includes(term) || e.dataOwner.toLowerCase().includes(term) || e.type.toLowerCase().includes(term);
      const matchesStatus = !status || e.status === status;
      const matchesCompliance = !compliance || e.complianceTag === compliance;
      return matchesSearch && matchesStatus && matchesCompliance;
    });
  });

  readonly totalCount = this.dataService.entityCount;
  readonly publishedCount = this.dataService.publishedCount;
  readonly draftCount = this.dataService.draftCount;

  getStatusClass(status: EntityStatus): string {
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

  deleteEntity(id: string, name: string): void {
    if (confirm(`Delete entity "${name}"? This action cannot be undone.`)) {
      this.dataService.delete(id);
    }
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.filterStatus.set('');
    this.filterCompliance.set('');
  }
}
