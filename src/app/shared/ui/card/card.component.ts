import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hoverLift } from '../../animations/triggers';

@Component({
  selector: 'app-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  animations: [hoverLift],
  template: `
    <article
      class="card"
      [class.card--clickable]="clickable()"
      [class.card--no-padding]="noPadding()"
      [@hoverLift]="hoverState()"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      [style.--accent-color]="accentColor()"
    >
      @if (accentColor()) {
        <div class="card__accent"></div>
      }
      <ng-content />
    </article>
  `,
  styles: `
    @use 'styles/variables' as *;

    .card {
      position: relative;
      background: var(--surface);
      border-radius: $border-radius-md;
      border: $border-width solid var(--border);
      padding: $spacing-lg;
      overflow: hidden;

      &__accent {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--accent-color, var(--primary));
      }
    }

    .card--clickable {
      cursor: pointer;
    }

    .card--no-padding {
      padding: 0;
    }
  `,
})
export class CardComponent {
  clickable = input<boolean>(false);
  noPadding = input<boolean>(false);
  accentColor = input<string>();

  hoverState = signal<'default' | 'hovered'>('default');

  onMouseEnter(): void {
    if (this.clickable()) {
      this.hoverState.set('hovered');
    }
  }

  onMouseLeave(): void {
    this.hoverState.set('default');
  }
}
