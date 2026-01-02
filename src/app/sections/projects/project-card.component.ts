import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../shared/ui/card/card.component';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { Project, getProjectCategoryColor } from '../../core/constants/portfolio-data';

@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, CardComponent, BadgeComponent, IconComponent],
  template: `
    <app-card [clickable]="true" [accentColor]="getCategoryColor()">
      <article class="project-card">
        <!-- Header -->
        <div class="project-card__header">
          <h3 class="project-card__title">{{ 'projects.items.' + project().id + '.title' | translate }}</h3>

          <!-- Links -->
          <div class="project-card__links">
            @if (project().links?.github) {
              <a
                [href]="project().links?.github"
                target="_blank"
                rel="noopener noreferrer"
                class="project-card__link"
                [attr.aria-label]="('projects.viewCode' | translate) + ' - ' + project().title"
              >
                <app-icon name="github" [size]="18" />
              </a>
            }
            @if (project().links?.live) {
              <a
                [href]="project().links?.live"
                target="_blank"
                rel="noopener noreferrer"
                class="project-card__link"
                [attr.aria-label]="('projects.viewLive' | translate) + ' - ' + project().title"
              >
                <app-icon name="external-link" [size]="18" />
              </a>
            }
          </div>
        </div>

        <!-- Description -->
        <p class="project-card__description">{{ 'projects.items.' + project().id + '.description' | translate }}</p>

        <!-- Technologies -->
        <div class="project-card__tech">
          @for (tech of visibleTech(); track tech) {
            <app-badge [variant]="'default'" [small]="true">{{ tech }}</app-badge>
          }
          @if (remainingCount() > 0) {
            <app-badge [variant]="'default'" [small]="true">
              {{ 'projects.moreTech' | translate: { count: remainingCount() } }}
            </app-badge>
          }
        </div>
      </article>
    </app-card>
  `,
  styles: `
    @use 'styles/variables' as *;

    .project-card {
      display: flex;
      flex-direction: column;
      gap: $spacing-md;
      height: 100%;

      &__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: $spacing-md;
      }

      &__title {
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        color: var(--text-primary);
        margin: 0;
      }

      &__links {
        display: flex;
        gap: $spacing-sm;
        flex-shrink: 0;
      }

      &__link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        color: var(--text-secondary);
        border-radius: $border-radius-sm;
        transition: all $transition-fast;

        &:hover {
          color: var(--text-primary);
          background: var(--surface-hover);
          text-decoration: none;
        }
      }

      &__description {
        font-size: $font-size-sm;
        color: var(--text-secondary);
        line-height: $line-height-relaxed;
        flex-grow: 1;
      }

      &__tech {
        display: flex;
        flex-wrap: wrap;
        gap: $spacing-xs;
        margin-top: auto;
      }
    }
  `,
})
export class ProjectCardComponent {
  project = input.required<Project>();
  maxTech = input<number>(4);

  visibleTech(): string[] {
    return this.project().technologies.slice(0, this.maxTech());
  }

  remainingCount(): number {
    const remaining = this.project().technologies.length - this.maxTech();
    return remaining > 0 ? remaining : 0;
  }

  getCategoryColor(): string {
    return getProjectCategoryColor(this.project().category);
  }
}
