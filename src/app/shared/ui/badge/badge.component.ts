import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'category';

@Component({
  selector: 'app-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <span
      [class]="badgeClasses()"
      [style.--badge-color]="color()"
    >
      <ng-content />
    </span>
  `,
  styles: `
    @use 'styles/variables' as *;

    .badge {
      display: inline-flex;
      align-items: center;
      gap: $spacing-xs;
      padding: $spacing-xs $spacing-sm;
      font-size: $font-size-xs;
      font-weight: $font-weight-medium;
      border-radius: $border-radius-full;
      white-space: nowrap;
      transition: all $transition-fast;
    }

    .badge--default {
      background: var(--surface-hover);
      color: var(--text-secondary);
    }

    .badge--primary {
      background: rgba(var(--primary-rgb, 0, 113, 227), 0.1);
      color: var(--primary);
    }

    .badge--success {
      background: rgba(13, 148, 136, 0.1);
      color: var(--teal);
    }

    .badge--warning {
      background: rgba(234, 179, 8, 0.1);
      color: #ca8a04;
    }

    .badge--category {
      background: color-mix(in srgb, var(--badge-color, var(--primary)) 15%, transparent);
      color: var(--badge-color, var(--primary));
      border: 1px solid color-mix(in srgb, var(--badge-color, var(--primary)) 30%, transparent);
    }

    .badge--small {
      padding: 2px $spacing-xs;
      font-size: 0.65rem;
    }
  `,
})
export class BadgeComponent {
  variant = input<BadgeVariant>('default');
  color = input<string>();
  small = input<boolean>(false);

  badgeClasses(): string {
    const classes = ['badge', `badge--${this.variant()}`];

    if (this.small()) {
      classes.push('badge--small');
    }

    return classes.join(' ');
  }
}
