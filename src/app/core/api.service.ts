import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export type OverviewResponse = {
  totalBalance: number;
  monthIncome: number;
  monthExpense: number;
  expensesByCategory: Array<{ categoryName: string; amount: number; color?: string | null }>;
  monthlyEvolution: Array<{ month: string; income: number; expense: number }>;
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  login(payload: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, payload);
  }

  register(payload: { name: string; email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/auth/register`, payload);
  }

  dashboardOverview() {
    return this.http.get<OverviewResponse>(`${this.baseUrl}/dashboard/overview`);
  }
}