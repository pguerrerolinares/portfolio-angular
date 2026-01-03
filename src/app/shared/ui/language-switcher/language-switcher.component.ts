import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { IconComponent } from '../icon/icon.component';

interface Language {
  code: string;
  label: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  host: {
    '(document:click)': 'onClickOutside($event)',
  },
})
export class LanguageSwitcherComponent {
  private translate = inject(TranslateService);

  languages: Language[] = [
    { code: 'es', label: 'ESP' },
    { code: 'en', label: 'ENG' },
  ];

  currentLang = signal<string>('es');
  isOpen = signal(false);

  currentLangLabel = () => this.languages.find(l => l.code === this.currentLang())?.label || 'ESP';

  constructor() {
    this.currentLang.set(this.translate.currentLang || 'es');
  }

  toggleDropdown(): void {
    this.isOpen.update(v => !v);
  }

  selectLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang.set(lang);
    this.isOpen.set(false);
  }

  onClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-select')) {
      this.isOpen.set(false);
    }
  }
}
