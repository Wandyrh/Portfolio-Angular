import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dtos/login.dto';
import { LoginUserResponseDTO } from './dtos/login-user-response.dto';
import { TokenService } from '../../shared/services/token.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      const dto: LoginDto = { userName: email, password };
      this.authService.login(dto).subscribe({
        next: (result: LoginUserResponseDTO) => {
          this.tokenService.setToken(result.accessToken);
          console.log('Login success:', result);
        },
        error: (err) => {
        
          console.error('Login failed:', err);
        }
      });
    }
  }
}
