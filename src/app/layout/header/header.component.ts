import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { ThemeToggleComponent } from '../../shared/ui/theme-toggle/theme-toggle.component';
import { LanguageSwitcherComponent } from '../../shared/ui/language-switcher/language-switcher.component';
import { NAV_LINKS, PERSONAL_INFO } from '../../core/constants/portfolio-data';
import { slideInFromRight } from '../../shared/animations/triggers';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
  },
  imports: [
    CommonModule,
    TranslateModule,
    IconComponent,
    ThemeToggleComponent,
    LanguageSwitcherComponent,
  ],
  animations: [slideInFromRight],
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
          <app-language-switcher />
          <app-theme-toggle />

          <!-- Mobile Menu Button -->
          <button
            class="header__menu-btn"
            (click)="toggleMobileMenu()"
            [attr.aria-expanded]="isMobileMenuOpen()"
            [attr.aria-controls]="'mobile-menu'"
            [attr.aria-label]="isMobileMenuOpen() ? 'Cerrar menú' : 'Abrir menú'"
          >
            <app-icon [name]="isMobileMenuOpen() ? 'close' : 'menu'" [size]="24" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      @if (isMobileMenuOpen()) {
        <div id="mobile-menu" class="mobile-menu" @slideInFromRight role="dialog" aria-label="Menú de navegación">
          <nav class="mobile-menu__nav">
            @for (link of navLinks; track link.href) {
              <a
                [href]="link.href"
                class="mobile-menu__link"
                (click)="closeMobileMenu()"
              >
                {{ link.translationKey | translate }}
              </a>
            }
          </nav>
        </div>
      }
    </header>
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

    .mobile-menu {
      position: fixed;
      top: 64px;
      right: 0;
      bottom: 0;
      width: 100%;
      max-width: 300px;
      background: var(--surface);
      border-left: $border-width solid var(--border);
      padding: $spacing-lg;
      z-index: $z-index-fixed;

      @include md {
        display: none;
      }

      &__nav {
        display: flex;
        flex-direction: column;
        gap: $spacing-md;
      }

      &__link {
        font-size: $font-size-lg;
        font-weight: $font-weight-medium;
        color: var(--text-primary);
        text-decoration: none;
        padding: $spacing-sm 0;
        border-bottom: $border-width solid var(--border);
        transition: color $transition-fast;

        &:hover {
          color: var(--primary);
          text-decoration: none;
        }
      }
    }
  `,
})
export class HeaderComponent {
  navLinks = NAV_LINKS;
  personalInfo = PERSONAL_INFO;

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
