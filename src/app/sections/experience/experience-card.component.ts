import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../shared/ui/card/card.component';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { Experience } from '../../core/constants/portfolio-data';

@Component({
  selector: 'app-experience-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, CardComponent, BadgeComponent, IconComponent],
  template: `
    <app-card>
      <article class="experience-card">
        <!-- Header -->
        <div class="experience-card__header">
          <div class="experience-card__icon">
            <app-icon [name]="experience().icon || 'briefcase'" [size]="24" />
          </div>

          <div class="experience-card__info">
            <h3 class="experience-card__company">{{ 'experience.items.' + experience().id + '.company' | translate }}</h3>
            <p class="experience-card__role">{{ 'experience.items.' + experience().id + '.role' | translate }}</p>
          </div>

          @if (experience().current) {
            <span class="experience-card__current">
              <span class="experience-card__pulse"></span>
              {{ 'experience.current' | translate }}
            </span>
          }
        </div>

        <!-- Date -->
        <p class="experience-card__date">
          {{ formatDate(experience().startDate) }} -
          {{ experience().current ? ('experience.present' | translate) : formatDate(experience().endDate!) }}
        </p>

        <!-- Highlights -->
        <ul class="experience-card__highlights">
          @for (idx of experience().highlights; track idx) {
            <li>{{ 'experience.items.' + experience().id + '.highlights.' + idx | translate }}</li>
          }
        </ul>

        <!-- Technologies -->
        <div class="experience-card__tech">
          @for (tech of experience().technologies.slice(0, 6); track tech) {
            <app-badge [variant]="'default'" [small]="true">{{ tech }}</app-badge>
          }
        </div>
      </article>
    </app-card>
  `,
  styles: `
    @use 'styles/variables' as *;

    .experience-card {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;

      &__header {
        display: flex;
        align-items: flex-start;
        gap: $spacing-md;
      }

      &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        background: var(--surface-hover);
        border-radius: $border-radius-md;
        color: var(--primary);
        flex-shrink: 0;
      }

      &__info {
        flex-grow: 1;
      }

      &__company {
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        color: var(--text-primary);
        margin: 0;
      }

      &__role {
        font-size: $font-size-sm;
        color: var(--text-secondary);
        margin: 0;
      }

      &__current {
        display: inline-flex;
        align-items: center;
        gap: $spacing-xs;
        padding: $spacing-xs $spacing-sm;
        font-size: $font-size-xs;
        font-weight: $font-weight-medium;
        color: var(--teal);
        background: rgba(13, 148, 136, 0.1);
        border-radius: $border-radius-full;
        flex-shrink: 0;
      }

      &__pulse {
        width: 8px;
        height: 8px;
        background: var(--teal);
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
      }

      &__date {
        font-size: $font-size-sm;
        color: var(--text-secondary);
      }

      &__highlights {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: $spacing-xs;

        li {
          font-size: $font-size-sm;
          color: var(--text-secondary);
          padding-left: $spacing-md;
          position: relative;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 8px;
            width: 4px;
            height: 4px;
            background: var(--primary);
            border-radius: 50%;
          }
        }
      }

      &__tech {
        display: flex;
        flex-wrap: wrap;
        gap: $spacing-xs;
        margin-top: auto;
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.2);
      }
    }
  `,
})
export class ExperienceCardComponent {
  experience = input.required<Experience>();

  formatDate(dateStr: string): string {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
  }
}
