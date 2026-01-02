import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [class]="buttonClasses()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      (click)="handleClick($event)"
    >
      <ng-content />
    </button>
  `,
  styles: `
    @use 'styles/variables' as *;

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: $spacing-sm;
      font-weight: $font-weight-medium;
      border-radius: $border-radius-full;
      cursor: pointer;
      transition: all $transition-base;
      border: $border-width solid transparent;
      text-decoration: none;
      white-space: nowrap;

      &:focus-visible {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    // Sizes
    .btn--sm {
      padding: $spacing-xs $spacing-md;
      font-size: $font-size-sm;
    }

    .btn--md {
      padding: $spacing-sm $spacing-lg;
      font-size: $font-size-sm;
    }

    .btn--lg {
      padding: $spacing-md $spacing-xl;
      font-size: $font-size-base;
    }

    // Variants
    .btn--primary {
      background: var(--primary);
      color: white;

      &:hover:not(:disabled) {
        filter: brightness(1.1);
      }
    }

    .btn--outline {
      background: transparent;
      color: var(--text-primary);
      border-color: var(--border);

      &:hover:not(:disabled) {
        background: var(--surface-hover);
      }
    }

    .btn--ghost {
      background: transparent;
      color: var(--text-secondary);

      &:hover:not(:disabled) {
        color: var(--text-primary);
        background: var(--surface-hover);
      }
    }

    // Full width
    .btn--full {
      width: 100%;
    }
  `,
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<'button' | 'submit'>('button');
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);
  ariaLabel = input<string>();

  clicked = output<MouseEvent>();

  buttonClasses(): string {
    const classes = [
      'btn',
      `btn--${this.variant()}`,
      `btn--${this.size()}`,
    ];

    if (this.fullWidth()) {
      classes.push('btn--full');
    }

    return classes.join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
