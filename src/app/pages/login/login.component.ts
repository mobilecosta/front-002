import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  mode: 'login' | 'register' = 'login';
  loading = false;
  error = '';

  form = this.fb.nonNullable.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  toggleMode(): void {
    this.mode = this.mode === 'login' ? 'register' : 'login';
    this.error = '';
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    const { name, email, password } = this.form.getRawValue();

    const done = () => {
      this.loading = false;
    };

    if (this.mode === 'register') {
      this.api.register({ name: name || 'User', email, password }).subscribe({
        next: () => {
          this.mode = 'login';
          done();
        },
        error: (err) => {
          this.error = err?.error?.message ?? 'Erro ao registrar';
          done();
        }
      });
      return;
    }

    this.api.login({ email, password }).subscribe({
      next: (response) => {
        this.auth.setToken(response.token);
        this.router.navigateByUrl('/dashboard');
        done();
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Credenciais inválidas';
        done();
      }
    });
  }
}