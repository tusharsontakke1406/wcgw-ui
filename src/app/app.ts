import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface NavItem {
  label: string;
  route: string;
  enabled: boolean;
  icon: SafeHtml;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private sanitizer = inject(DomSanitizer);

  collapsed = signal(false);
  activeRole = signal<string>('Risk Analyst');
  readonly roles = ['Risk Analyst', 'Risk Manager', 'Executive'] as const;

  readonly navItems: NavItem[] = [
    {
      label: 'Dashboard',
      route: '/dashboard',
      enabled: true,
      icon: this.icon(`<rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>`)
    },
    {
      label: 'Dashboard Builder',
      route: '/dashboard-builder',
      enabled: false,
      icon: this.icon(`<rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>`)
    },
    {
      label: 'WCGW Entities',
      route: '/wcgw-entities',
      enabled: false,
      icon: this.icon(`<polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"/>`)
    },
    {
      label: 'WCGW Definitions',
      route: '/wcgw-definitions',
      enabled: true,
      icon: this.icon(`<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>`)
    },
    {
      label: 'Data Ingestion',
      route: '/data-ingestion',
      enabled: false,
      icon: this.icon(`<ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`)
    },
    {
      label: 'WCGW Logic Builder',
      route: '/logic-builder',
      enabled: false,
      icon: this.icon(`<line x1="6" y1="3" x2="6" y2="15"/>
        <circle cx="18" cy="6" r="3"/>
        <circle cx="6" cy="18" r="3"/>
        <path d="M18 9a9 9 0 0 1-9 9"/>`)
    },
    {
      label: 'Assessment Config',
      route: '/assessment-config',
      enabled: false,
      icon: this.icon(`<line x1="4" y1="21" x2="4" y2="14"/>
        <line x1="4" y1="10" x2="4" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12" y2="3"/>
        <line x1="20" y1="21" x2="20" y2="16"/>
        <line x1="20" y1="12" x2="20" y2="3"/>
        <line x1="1" y1="14" x2="7" y2="14"/>
        <line x1="9" y1="8" x2="15" y2="8"/>
        <line x1="17" y1="16" x2="23" y2="16"/>`)
    },
    {
      label: 'WCGW Results',
      route: '/results',
      enabled: false,
      icon: this.icon(`<line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <line x1="2" y1="20" x2="22" y2="20"/>`)
    },
    {
      label: 'Results History',
      route: '/results-history',
      enabled: false,
      icon: this.icon(`<polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-4.56"/>`)
    },
    {
      label: 'Model Control Tower',
      route: '/model-control-tower',
      enabled: false,
      icon: this.icon(`<path d="M2 20h20"/>
        <path d="M4 20V10l8-6 8 6v10"/>
        <path d="M10 20v-5h4v5"/>
        <path d="M12 4v2"/>`)
    },
    {
      label: 'Lineage Explorer',
      route: '/lineage-explorer',
      enabled: false,
      icon: this.icon(`<circle cx="12" cy="5" r="3"/>
        <path d="M12 8v8"/>
        <circle cx="5" cy="19" r="3"/>
        <circle cx="19" cy="19" r="3"/>
        <path d="M12 16l-7 3M12 16l7 3"/>`)
    },
    {
      label: 'Thresholds',
      route: '/thresholds',
      enabled: false,
      icon: this.icon(`<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`)
    },
    {
      label: 'Alerts & Monitoring',
      route: '/alerts',
      enabled: false,
      icon: this.icon(`<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>`)
    },
    {
      label: 'Reporting',
      route: '/reporting',
      enabled: false,
      icon: this.icon(`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>`)
    },
    {
      label: 'System Logs',
      route: '/system-logs',
      enabled: false,
      icon: this.icon(`<polyline points="4 17 10 11 4 5"/>
        <line x1="12" y1="19" x2="20" y2="19"/>`)
    },
    {
      label: 'Administration',
      route: '/administration',
      enabled: false,
      icon: this.icon(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`)
    }
  ];

  private icon(paths: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
    );
  }

  toggleCollapse() {
    this.collapsed.update(v => !v);
  }
}
