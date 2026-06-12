import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WcgwDefinitionService } from '../../core/services/wcgw-definition.service';
import { Severity, DefinitionStatus } from '../../core/models/wcgw-definition.model';

@Component({
  selector: 'app-wcgw-definitions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wcgw-definitions.component.html',
  styleUrls: ['./wcgw-definitions.component.scss']
})
export class WcgwDefinitionsComponent {
  private svc = inject(WcgwDefinitionService);

  showModal = signal(false);
  searchTerm = signal('');

  readonly filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.svc.definitions();
    return this.svc.definitions().filter(d =>
      d.name.toLowerCase().includes(term) ||
      d.category.toLowerCase().includes(term) ||
      d.wcgwEntity.toLowerCase().includes(term) ||
      d.description.toLowerCase().includes(term)
    );
  });

  /* ─── Modal form state (plain properties for ngModel) ─── */
  fname = '';
  fdesc = '';
  fcat = '';
  fentity = '';
  fseverity: Severity = 'Medium';
  fparams: { name: string; description: string; type: string; required: boolean }[] = [];
  fnameError = false;

  readonly severityOptions: Severity[] = ['Low', 'Medium', 'High', 'Critical'];
  readonly entityOptions = [
    'Task', 'Obligation', 'Party', 'Activity',
    'Event', 'Process', 'Risk Factor', 'Control'
  ];
  readonly typeOptions = ['String', 'Number', 'Boolean', 'Date'];

  /* ─── Search binding helper ─── */
  get st(): string { return this.searchTerm(); }
  set st(v: string) { this.searchTerm.set(v); }

  openModal() {
    this.fname = '';
    this.fdesc = '';
    this.fcat = '';
    this.fentity = '';
    this.fseverity = 'Medium';
    this.fparams = [];
    this.fnameError = false;
    this.showModal.set(true);
  }

  closeModal() { this.showModal.set(false); }

  addParam() {
    this.fparams = [...this.fparams, { name: '', description: '', type: 'String', required: false }];
  }

  removeParam(i: number) { this.fparams = this.fparams.filter((_, idx) => idx !== i); }

  updateParam(i: number, field: 'name' | 'description' | 'type' | 'required', val: string | boolean) {
    this.fparams = this.fparams.map((p, idx) => idx === i ? { ...p, [field]: val } : p);
  }

  saveDraft() { this.save('Draft'); }

  saveAndPublish() { this.save('Published'); }

  private save(status: DefinitionStatus) {
    if (!this.fname.trim()) { this.fnameError = true; return; }
    this.svc.add({
      name: this.fname.trim(),
      description: this.fdesc.trim(),
      category: this.fcat.trim(),
      wcgwEntity: this.fentity,
      severity: this.fseverity,
      status,
      customParams: this.fparams
        .filter(p => p.name.trim())
        .map((p, i) => ({ id: 'cp' + Date.now() + i, key: p.name.trim(), value: p.type }))
    });
    this.closeModal();
  }

  publish(id: string) { this.svc.publish(id); }

  trackByIdx(index: number): number { return index; }
}
