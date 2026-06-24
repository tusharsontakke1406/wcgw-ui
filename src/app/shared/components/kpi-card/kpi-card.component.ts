import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class KpiCardComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() color: string = 'primary';
}