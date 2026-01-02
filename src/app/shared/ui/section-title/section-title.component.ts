import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="section-title" [class.section-title--centered]="centered()">
      @if (eyebrow()) {
        <span class="section-title__eyebrow">{{ eyebrow() }}</span>
      }
      <h2 class="section-title__heading">
        <ng-content />
      </h2>
      @if (description()) {
        <p class="section-title__description">{{ description() }}</p>
      }
    </div>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .section-title {
      margin-bottom: $spacing-2xl;

      &--centered {
        text-align: center;

        .section-title__description {
          margin-inline: auto;
        }
      }

      &__eyebrow {
        @include eyebrow;
        display: block;
        color: var(--primary);
        margin-bottom: $spacing-sm;
      }

      &__heading {
        @include heading-display;
        color: var(--text-primary);
        margin-bottom: $spacing-md;
      }

      &__description {
        @include body-large;
        color: var(--text-secondary);
        max-width: 60ch;
      }
    }
  `,
})
export class SectionTitleComponent {
  eyebrow = input<string>();
  description = input<string>();
  centered = input<boolean>(false);
}
