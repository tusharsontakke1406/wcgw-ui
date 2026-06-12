import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StaticDataService } from '../../../../core/services/static-data.service';
import { EntityStatus, ENTITY_STATUS_LABELS } from '../../../../core/models/enums/entity-status.enum';
import { COMPLIANCE_TAG_LABELS } from '../../../../core/models/enums/compliance-tag.enum';
import { ATTRIBUTE_DATA_TYPE_LABELS } from '../../../../core/models/enums/attribute-data-type.enum';
import { SENSITIVITY_CLASSIFICATION_LABELS } from '../../../../core/models/enums/sensitivity-classification.enum';

@Component({
  selector: 'app-entity-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss']
})
export class EntityDetailsComponent {
  private dataService = inject(StaticDataService);
  private route = inject(ActivatedRoute);

  readonly id = this.route.snapshot.paramMap.get('id')!;
  readonly entity = computed(() => this.dataService.getById(this.id));

  readonly statusLabels = ENTITY_STATUS_LABELS;
  readonly complianceLabels = COMPLIANCE_TAG_LABELS;
  readonly dataTypeLabels = ATTRIBUTE_DATA_TYPE_LABELS;
  readonly sensitivityLabels = SENSITIVITY_CLASSIFICATION_LABELS;

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
}
