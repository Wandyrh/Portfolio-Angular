import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dtos/login.dto';
import { TokenService } from '../../shared/services/token.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LanguageSelector } from '../../shared/components/language-selector/language-selector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule, LanguageSelector],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      const dto: LoginDto = { userName: email, password };
      this.authService.login(dto).subscribe({
        next: (result) => {
          this.tokenService.setToken(result.data?.accessToken || '');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      });
    }
  }
}
