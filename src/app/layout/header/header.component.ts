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
  standalone: true,
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
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
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
