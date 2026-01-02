import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';
import { ExperienceCardComponent } from './experience-card.component';
import { EXPERIENCES } from '../../core/constants/portfolio-data';
import { fadeInLeft, fadeInRight } from '../../shared/animations/triggers';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    SectionTitleComponent,
    ExperienceCardComponent,
  ],
  animations: [fadeInLeft, fadeInRight],
  template: `
    <section class="experience section" id="experience">
      <div class="container">
        <app-section-title
          [eyebrow]="'experience.eyebrow' | translate"
          [description]="'experience.description' | translate"
        >
          {{ 'experience.title' | translate }}
        </app-section-title>

        <!-- Timeline -->
        <div class="experience__timeline">
          @for (exp of experiences; track exp.id; let i = $index; let odd = $odd) {
            <div
              class="experience__item"
              [class.experience__item--right]="odd"
              [@fadeInLeft]="!odd"
              [@fadeInRight]="odd"
            >
              <div class="experience__card">
                <app-experience-card [experience]="exp" />
              </div>
              <div class="experience__connector">
                <div class="experience__dot"></div>
                @if (i < experiences.length - 1) {
                  <div class="experience__line"></div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .experience {
      &__timeline {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: $spacing-xl;
      }

      &__item {
        display: grid;
        gap: $spacing-md;
        grid-template-columns: 1fr auto;

        @include lg {
          grid-template-columns: 1fr auto 1fr;
        }

        &--right {
          @include lg {
            .experience__card {
              grid-column: 3;
            }
            .experience__connector {
              grid-column: 2;
              grid-row: 1;
            }
          }
        }
      }

      &__card {
        @include lg {
          grid-column: 1;
        }
      }

      &__connector {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: $spacing-lg;

        @include lg {
          grid-column: 2;
        }
      }

      &__dot {
        width: 12px;
        height: 12px;
        background: var(--primary);
        border-radius: 50%;
        flex-shrink: 0;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          inset: -4px;
          border: 2px solid var(--primary);
          border-radius: 50%;
          opacity: 0.3;
        }
      }

      &__line {
        width: 2px;
        flex-grow: 1;
        background: var(--border);
        margin-top: $spacing-sm;
      }
    }
  `,
})
export class ExperienceComponent {
  experiences = EXPERIENCES;
}
