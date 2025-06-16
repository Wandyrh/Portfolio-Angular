import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageStateService } from '../../services/language-state.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.html',
  styleUrls: ['./language-selector.scss']
})
export class LanguageSelector {
  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];
  selected = 'en';
  showDropdown = false;

  constructor(
    private langService: LanguageStateService,
    private translate: TranslateService
  ) {
    this.langService.language$.subscribe(lang => {
      this.selected = lang;
      this.translate.use(lang);
    });
  }

  get selectedLabel(): string {
    for (const lang of this.languages) {
      if (lang.code === this.selected) return lang.label;
    }
    return 'Language';
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown() {
    this.showDropdown = false;
  }

  changeLanguage(lang: string) {
    this.langService.setLanguage(lang);
    this.closeDropdown();
  }
}