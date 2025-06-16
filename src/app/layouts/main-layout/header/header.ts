import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { LanguageSelector } from '../../../shared/components/language-selector/language-selector';
import { TranslateModule } from '@ngx-translate/core';
 
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LanguageSelector, TranslateModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  showDropdown = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  onLogout(): void {    
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}