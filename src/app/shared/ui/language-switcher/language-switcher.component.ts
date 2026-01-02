import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="language-switcher">
      <button
        class="language-switcher__button"
        [class.active]="currentLang() === 'es'"
        (click)="setLanguage('es')"
        aria-label="Cambiar a español"
      >
        ES
      </button>
      <span class="language-switcher__divider">/</span>
      <button
        class="language-switcher__button"
        [class.active]="currentLang() === 'en'"
        (click)="setLanguage('en')"
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  `,
  styles: `
    @use 'styles/variables' as *;

    .language-switcher {
      display: flex;
      align-items: center;
      gap: $spacing-xs;

      &__button {
        padding: $spacing-xs $spacing-sm;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: var(--text-secondary);
        background: transparent;
        border: none;
        border-radius: $border-radius-sm;
        cursor: pointer;
        transition: all $transition-fast;

        &:hover {
          color: var(--text-primary);
        }

        &.active {
          color: var(--primary);
          font-weight: $font-weight-semibold;
        }

        &:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
      }

      &__divider {
        color: var(--text-secondary);
        opacity: 0.5;
      }
    }
  `,
})
export class LanguageSwitcherComponent {
  private translate = inject(TranslateService);
  currentLang = signal<string>('es');

  constructor() {
    this.currentLang.set(this.translate.currentLang || 'es');
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.currentLang.set(lang);
  }
}
