import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { StaticDataService } from '../../../../core/services/static-data.service';
import { EntityStatus } from '../../../../core/models/enums/entity-status.enum';
import { ComplianceTag, COMPLIANCE_TAG_LABELS } from '../../../../core/models/enums/compliance-tag.enum';
import { AttributeDataType, ATTRIBUTE_DATA_TYPE_LABELS } from '../../../../core/models/enums/attribute-data-type.enum';
import { SensitivityClassification, SENSITIVITY_CLASSIFICATION_LABELS } from '../../../../core/models/enums/sensitivity-classification.enum';
import { RiskEntity } from '../../../../core/models/risk-entity.model';

@Component({
  selector: 'app-entity-create',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './entity-create.component.html',
  styleUrls: ['./entity-create.component.scss']
})
export class EntityCreateComponent {
  private fb = inject(FormBuilder);
  private dataService = inject(StaticDataService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly complianceOptions = Object.values(ComplianceTag);
  readonly dataTypeOptions = Object.values(AttributeDataType);
  readonly sensitivityOptions = Object.values(SensitivityClassification);
  readonly statusOptions = Object.values(EntityStatus);
  readonly complianceLabels = COMPLIANCE_TAG_LABELS;
  readonly dataTypeLabels = ATTRIBUTE_DATA_TYPE_LABELS;
  readonly sensitivityLabels = SENSITIVITY_CLASSIFICATION_LABELS;

  readonly editId = this.route.snapshot.paramMap.get('id');
  readonly isEdit = !!this.editId;
  readonly submitError = signal<string | null>(null);

  form = this.fb.group({
    name:                ['', [Validators.required, Validators.minLength(3)]],
    type:                ['', Validators.required],
    description:         [''],
    primaryKey:          ['', Validators.required],
    dataOwner:           ['', Validators.required],
    complianceTag:       [ComplianceTag.NONE, Validators.required],
    dataSourceRegistryId: ['', Validators.required],
    status:              [EntityStatus.DRAFT, Validators.required],
    attributes:          this.fb.array([])
  });

  get attributesArray() {
    return this.form.get('attributes') as FormArray;
  }

  constructor() {
    if (this.isEdit && this.editId) {
      const existing = this.dataService.getById(this.editId);
      if (existing) {
        this.form.patchValue({
          name: existing.name,
          type: existing.type,
          description: existing.description ?? '',
          primaryKey: existing.primaryKey,
          dataOwner: existing.dataOwner,
          complianceTag: existing.complianceTag,
          dataSourceRegistryId: existing.dataSourceRegistryId,
          status: existing.status
        });
        existing.attributes.forEach(attr => this.attributesArray.push(this.buildAttributeGroup(attr)));
      }
    }
    if (this.attributesArray.length === 0) {
      this.addAttribute();
    }
  }

  private buildAttributeGroup(attr?: any) {
    return this.fb.group({
      id:                      [attr?.id ?? ('attr-' + Date.now() + Math.random())],
      name:                    [attr?.name ?? '', Validators.required],
      dataType:                [attr?.dataType ?? AttributeDataType.STRING, Validators.required],
      description:             [attr?.description ?? ''],
      isRequired:              [attr?.isRequired ?? false],
      isPrimaryKey:            [attr?.isPrimaryKey ?? false],
      sensitivityClassification: [attr?.sensitivityClassification ?? SensitivityClassification.INTERNAL, Validators.required],
      defaultValue:            [attr?.defaultValue ?? ''],
    });
  }

  addAttribute() {
    this.attributesArray.push(this.buildAttributeGroup());
  }

  removeAttribute(index: number) {
    this.attributesArray.removeAt(index);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.submitError.set('Please fill in all required fields.');
      return;
    }
    this.submitError.set(null);
    const raw = this.form.getRawValue();
    const payload = {
      name: raw.name!,
      type: raw.type!,
      description: raw.description ?? undefined,
      primaryKey: raw.primaryKey!,
      dataOwner: raw.dataOwner!,
      complianceTag: raw.complianceTag as ComplianceTag,
      dataSourceRegistryId: raw.dataSourceRegistryId!,
      status: raw.status as EntityStatus,
      attributes: (raw.attributes as any[]).map((a: any) => ({
        id: a.id,
        name: a.name,
        dataType: a.dataType as AttributeDataType,
        description: a.description || undefined,
        isRequired: a.isRequired,
        isPrimaryKey: a.isPrimaryKey,
        sensitivityClassification: a.sensitivityClassification as SensitivityClassification,
        defaultValue: a.defaultValue || undefined
      }))
    };

    if (this.isEdit && this.editId) {
      this.dataService.update(this.editId, payload);
      this.router.navigate(['/entities', this.editId]);
    } else {
      const created = this.dataService.add(payload);
      this.router.navigate(['/entities', created.id]);
    }
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  isAttrInvalid(index: number, field: string): boolean {
    const ctrl = this.attributesArray.at(index).get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }
}
