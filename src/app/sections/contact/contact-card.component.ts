import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../shared/ui/icon/icon.component';

@Component({
  selector: 'app-contact-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  template: `
    @if (href()) {
      <a
        [href]="href()"
        [target]="external() ? '_blank' : null"
        [rel]="external() ? 'noopener noreferrer' : null"
        class="contact-card contact-card--link"
        [style.--accent-color]="accentColor()"
      >
        <ng-container *ngTemplateOutlet="cardContent" />
      </a>
    } @else if (copyable()) {
      <button
        class="contact-card contact-card--button"
        [style.--accent-color]="accentColor()"
        (click)="copyToClipboard()"
        [attr.aria-label]="'Copiar ' + value()"
      >
        <ng-container *ngTemplateOutlet="cardContent" />
      </button>
    } @else {
      <div class="contact-card" [style.--accent-color]="accentColor()">
        <ng-container *ngTemplateOutlet="cardContent" />
      </div>
    }

    <ng-template #cardContent>
      <div class="contact-card__icon">
        <app-icon [name]="icon()" [size]="24" />
      </div>
      <div class="contact-card__content">
        <span class="contact-card__label">{{ label() }}</span>
        <span class="contact-card__value">{{ value() }}</span>
      </div>
      @if (href() || copyable()) {
        <div class="contact-card__action">
          @if (copied()) {
            <app-icon name="check" [size]="18" />
          } @else if (copyable()) {
            <app-icon name="copy" [size]="18" />
          } @else {
            <app-icon name="arrow-right" [size]="18" />
          }
        </div>
      }
    </ng-template>
  `,
  styles: `
    @use 'styles/variables' as *;

    .contact-card {
      display: flex;
      align-items: center;
      gap: $spacing-md;
      padding: $spacing-lg;
      background: var(--surface);
      border: $border-width solid var(--border);
      border-radius: $border-radius-md;
      transition: all $transition-base;
      text-decoration: none;
      color: inherit;
      width: 100%;
      text-align: left;

      &--link,
      &--button {
        cursor: pointer;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px color-mix(in srgb, var(--accent-color, var(--primary)) 20%, transparent);
          border-color: color-mix(in srgb, var(--accent-color, var(--primary)) 30%, transparent);
          text-decoration: none;
        }

        &:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
      }

      &--button {
        background: var(--surface);
        border: $border-width solid var(--border);
        font: inherit;
      }

      &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        background: color-mix(in srgb, var(--accent-color, var(--primary)) 10%, transparent);
        color: var(--accent-color, var(--primary));
        border-radius: $border-radius-md;
        flex-shrink: 0;
      }

      &__content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }

      &__label {
        font-size: $font-size-xs;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: $letter-spacing-wide;
      }

      &__value {
        font-size: $font-size-base;
        font-weight: $font-weight-medium;
        color: var(--text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &__action {
        color: var(--text-secondary);
        flex-shrink: 0;
      }
    }
  `,
})
export class ContactCardComponent {
  icon = input.required<IconName>();
  label = input.required<string>();
  value = input.required<string>();
  href = input<string>();
  external = input<boolean>(true);
  copyable = input<boolean>(false);
  accentColor = input<string>();

  copied = signal(false);
  onCopy = output<string>();

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.value());
      this.copied.set(true);
      this.onCopy.emit(this.value());

      setTimeout(() => {
        this.copied.set(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
}
