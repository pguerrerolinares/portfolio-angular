import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { hoverLift } from '../../animations/triggers';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  animations: [hoverLift],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
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
