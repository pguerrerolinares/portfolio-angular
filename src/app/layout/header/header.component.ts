import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { A11yModule } from '@angular/cdk/a11y';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { ThemeToggleComponent } from '../../shared/ui/theme-toggle/theme-toggle.component';
import { LanguageSwitcherComponent } from '../../shared/ui/language-switcher/language-switcher.component';
import { NAV_LINKS, PERSONAL_INFO } from '../../core/constants/portfolio-data';
import { fadeIn, slideUp } from '../../shared/animations/triggers';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(window:keydown.escape)': 'closeMobileMenu()',
  },
  imports: [
    CommonModule,
    TranslateModule,
    A11yModule,
    IconComponent,
    ThemeToggleComponent,
    LanguageSwitcherComponent,
  ],
  animations: [fadeIn, slideUp],
  template: `
    <header class="header" [class.header--scrolled]="isScrolled()">
      <nav class="header__nav container">
        <!-- Logo -->
        <a href="#" class="header__logo" aria-label="Ir al inicio">
          {{ personalInfo.initials }}
        </a>

        <!-- Desktop Navigation -->
        <ul class="header__links">
          @for (link of navLinks; track link.href) {
            <li>
              <a [href]="link.href" class="header__link">
                {{ link.translationKey | translate }}
              </a>
            </li>
          }
        </ul>

        <!-- Actions -->
        <div class="header__actions">
          <div class="header__desktop-controls">
            <app-language-switcher />
            <app-theme-toggle />
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="header__menu-btn"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="isMobileMenuOpen()"
            [attr.aria-controls]="'bottom-sheet'"
            [attr.aria-label]="isMobileMenuOpen() ? 'Cerrar menú' : 'Abrir menú'"
          >
            <app-icon [name]="isMobileMenuOpen() ? 'close' : 'menu'" [size]="24" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>

    <!-- Bottom Sheet Overlay -->
    @if (isMobileMenuOpen()) {
      <div
        class="bottom-sheet-overlay"
        @fadeIn
        (click)="closeMobileMenu()"
        aria-hidden="true"
      ></div>
    }

    <!-- Bottom Sheet Menu -->
    @if (isMobileMenuOpen()) {
      <div
        id="bottom-sheet"
        class="bottom-sheet"
        @slideUp
        role="dialog"
        aria-label="Menú de navegación"
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="true"
        (touchstart)="onTouchStart($event)"
        (touchmove)="onTouchMove($event)"
        (touchend)="onTouchEnd()"
      >
        <div class="bottom-sheet__handle" aria-hidden="true"></div>

        <nav class="bottom-sheet__nav">
          @for (link of navLinks; track link.href) {
            <a
              [href]="link.href"
              class="bottom-sheet__link"
              (click)="closeMobileMenu()"
            >
              {{ link.translationKey | translate }}
            </a>
          }
        </nav>

        <div class="bottom-sheet__actions">
          <app-theme-toggle />
          <app-language-switcher />
        </div>
      </div>
    }
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: $z-index-fixed;
      background: transparent;
      transition: all $transition-slow;

      &--scrolled {
        background: color-mix(in srgb, var(--background) 80%, transparent);
        backdrop-filter: blur(12px);
        border-bottom: $border-width solid var(--border);
      }

      &__nav {
        @include flex-between;
        height: 64px;

        @include md {
          height: 72px;
        }
      }

      &__logo {
        font-size: $font-size-xl;
        font-weight: $font-weight-bold;
        color: var(--text-primary);
        text-decoration: none;
        transition: color $transition-fast;

        &:hover {
          color: var(--primary);
          text-decoration: none;
        }
      }

      &__links {
        display: none;
        list-style: none;
        gap: $spacing-xl;

        @include md {
          display: flex;
        }
      }

      &__link {
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: var(--text-secondary);
        text-decoration: none;
        transition: color $transition-fast;

        &:hover {
          color: var(--text-primary);
          text-decoration: none;
        }
      }

      &__actions {
        display: flex;
        align-items: center;
        gap: $spacing-sm;
      }

      &__desktop-controls {
        display: none;
        align-items: center;
        gap: $spacing-sm;

        @include md {
          display: flex;
        }
      }

      &__menu-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border: none;
        background: transparent;
        color: var(--text-primary);
        cursor: pointer;

        @include md {
          display: none;
        }

        &:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
      }
    }

    .bottom-sheet-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: $z-index-modal-backdrop;

      @include md {
        display: none;
      }
    }

    .bottom-sheet {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--surface);
      border-radius: $border-radius-lg $border-radius-lg 0 0;
      padding: $spacing-md $spacing-lg $spacing-2xl;
      z-index: $z-index-modal;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);

      @include md {
        display: none;
      }

      &__handle {
        width: 40px;
        height: 4px;
        background: var(--border);
        border-radius: 2px;
        margin: 0 auto $spacing-lg;
      }

      &__nav {
        display: flex;
        flex-direction: column;
        gap: $spacing-xs;
      }

      &__link {
        display: flex;
        align-items: center;
        padding: $spacing-md;
        font-size: $font-size-lg;
        font-weight: $font-weight-medium;
        color: var(--text-primary);
        text-decoration: none;
        border-radius: $border-radius-sm;
        transition: background $transition-fast;

        &:hover {
          background: var(--surface-hover);
          text-decoration: none;
        }

        &:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: -2px;
        }
      }

      &__actions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: $spacing-xl;
        margin-top: $spacing-xl;
        padding-top: $spacing-lg;
        border-top: $border-width solid var(--border);
      }
    }
  `,
})
export class HeaderComponent {
  navLinks = NAV_LINKS;
  personalInfo = PERSONAL_INFO;

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  private touchStartY = 0;
  private touchCurrentY = 0;

  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartY = event.touches[0].clientY;
  }

  onTouchMove(event: TouchEvent): void {
    this.touchCurrentY = event.touches[0].clientY;
  }

  onTouchEnd(): void {
    const swipeDistance = this.touchCurrentY - this.touchStartY;
    if (swipeDistance > 50) {
      this.closeMobileMenu();
    }
    this.touchStartY = 0;
    this.touchCurrentY = 0;
  }
}
