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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="language-select">
      <button
        class="language-select__trigger"
        (click)="toggleDropdown()"
        [attr.aria-expanded]="isOpen()"
        aria-haspopup="listbox"
        aria-label="Seleccionar idioma"
      >
        <span class="language-select__current">{{ currentLangLabel() }}</span>
        <app-icon
          name="arrow-down"
          [size]="16"
          class="language-select__icon"
          [class.language-select__icon--open]="isOpen()"
          aria-hidden="true"
        />
      </button>

      @if (isOpen()) {
        <ul class="language-select__dropdown" role="listbox" aria-label="Idiomas disponibles">
          @for (lang of languages; track lang.code) {
            <li
              class="language-select__option"
              [class.language-select__option--active]="currentLang() === lang.code"
              role="option"
              [attr.aria-selected]="currentLang() === lang.code"
              (click)="selectLanguage(lang.code)"
            >
              {{ lang.label }}
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: `
    @use 'styles/variables' as *;

    .language-select {
      position: relative;

      &__trigger {
        display: flex;
        align-items: center;
        gap: $spacing-xs;
        padding: $spacing-sm $spacing-md;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: var(--text-primary);
        background: var(--surface);
        border: $border-width solid var(--border);
        border-radius: $border-radius-sm;
        cursor: pointer;
        transition: all $transition-fast;

        &:hover {
          border-color: var(--primary);
        }

        &:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
      }

      &__current {
        min-width: 60px;
      }

      &__icon {
        color: var(--text-secondary);
        transition: transform $transition-fast;

        &--open {
          transform: rotate(180deg);
        }
      }

      &__dropdown {
        position: absolute;
        top: calc(100% + $spacing-xs);
        left: 0;
        right: 0;
        background: var(--surface);
        border: $border-width solid var(--border);
        border-radius: $border-radius-sm;
        box-shadow: var(--shadow-md);
        list-style: none;
        padding: $spacing-xs;
        z-index: 10;
      }

      &__option {
        padding: $spacing-sm $spacing-md;
        font-size: $font-size-sm;
        color: var(--text-primary);
        border-radius: $border-radius-sm;
        cursor: pointer;
        transition: background $transition-fast;

        &:hover {
          background: var(--surface-hover);
        }

        &--active {
          color: var(--primary);
          font-weight: $font-weight-semibold;
        }
      }
    }
  `,
  host: {
    '(document:click)': 'onClickOutside($event)',
  },
})
export class LanguageSwitcherComponent {
  private translate = inject(TranslateService);

  languages: Language[] = [
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' },
  ];

  currentLang = signal<string>('es');
  isOpen = signal(false);

  currentLangLabel = () => this.languages.find(l => l.code === this.currentLang())?.label || 'Español';

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
