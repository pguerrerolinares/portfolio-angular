import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';
import { ProjectCardComponent } from './project-card.component';
import { PROJECTS } from '../../core/constants/portfolio-data';
import { fadeInUp, staggerList } from '../../shared/animations/triggers';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    SectionTitleComponent,
    ProjectCardComponent,
  ],
  animations: [fadeInUp, staggerList],
  template: `
    <section class="projects section" id="projects">
      <div class="container">
        <app-section-title
          [eyebrow]="'projects.eyebrow' | translate"
          [description]="'projects.description' | translate"
        >
          {{ 'projects.title' | translate }}
        </app-section-title>

        <!-- Featured Projects -->
        @if (featuredProjects().length > 0) {
          <div class="projects__group">
            <h3 class="projects__group-title">{{ 'projects.featured' | translate }}</h3>
            <div class="projects__grid" @staggerList>
              @for (project of featuredProjects(); track project.id) {
                <app-project-card [project]="project" />
              }
            </div>
          </div>
        }

        <!-- Other Projects -->
        @if (otherProjects().length > 0) {
          <div class="projects__group">
            <h3 class="projects__group-title">{{ 'projects.other' | translate }}</h3>
            <div class="projects__grid" @staggerList>
              @for (project of otherProjects(); track project.id) {
                <app-project-card [project]="project" />
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .projects {
      &__group {
        &:not(:last-child) {
          margin-bottom: $spacing-3xl;
        }
      }

      &__group-title {
        font-size: $font-size-lg;
        font-weight: $font-weight-semibold;
        color: var(--text-primary);
        margin-bottom: $spacing-lg;
      }

      &__grid {
        display: grid;
        gap: $spacing-lg;

        @include md {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }
  `,
})
export class ProjectsComponent {
  featuredProjects = computed(() => PROJECTS.filter((p) => p.featured));
  otherProjects = computed(() => PROJECTS.filter((p) => !p.featured));
}
