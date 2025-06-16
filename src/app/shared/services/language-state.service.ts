import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageStateService {
  private static readonly STORAGE_KEY = 'lang';
  private languageSubject: BehaviorSubject<string>;

  language$: import("rxjs").Observable<string>;

  constructor() {
    const savedLang = localStorage.getItem(LanguageStateService.STORAGE_KEY);
    this.languageSubject = new BehaviorSubject<string>(savedLang || 'en');
    this.language$ = this.languageSubject.asObservable();
  }

  setLanguage(lang: string) {
    localStorage.setItem(LanguageStateService.STORAGE_KEY, lang);
    this.languageSubject.next(lang);
  }

  getLanguage(): string {
    return this.languageSubject.value;
  }
}