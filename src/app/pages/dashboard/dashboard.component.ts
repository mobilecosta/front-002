import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, OverviewResponse } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  readonly data = signal<OverviewResponse | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor(
    private readonly api: ApiService,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');

    this.api.dashboardOverview().subscribe({
      next: (response) => {
        this.data.set(response);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Erro ao carregar dashboard');
        this.loading.set(false);
      }
    });
  }

  logout(): void {
    this.auth.clearToken();
    this.router.navigateByUrl('/login');
  }
}