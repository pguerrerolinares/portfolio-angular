import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'category';

@Component({
  selector: 'app-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
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
