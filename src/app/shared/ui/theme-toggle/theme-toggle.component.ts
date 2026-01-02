import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  template: `
    <button
      class="theme-toggle"
      (click)="themeService.toggleTheme()"
      [attr.aria-label]="themeService.isDark() ? 'Activar modo claro' : 'Activar modo oscuro'"
      type="button"
    >
      @if (themeService.isDark()) {
        <app-icon name="sun" [size]="20" />
      } @else {
        <app-icon name="moon" [size]="20" />
      }
    </button>
  `,
  styles: `
    @use 'styles/variables' as *;

    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      border-radius: $border-radius-full;
      cursor: pointer;
      transition: all $transition-fast;

      &:hover {
        color: var(--text-primary);
        background: var(--surface-hover);
      }

      &:focus-visible {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
      }
    }
  `,
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}
