import { Component, signal, PLATFORM_ID, inject, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';
import { SKILLS, STATS } from '../../core/constants/portfolio-data';
import { fadeInUp, staggerList } from '../../shared/animations/triggers';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, SectionTitleComponent, BadgeComponent],
  animations: [fadeInUp, staggerList],
  template: `
    <section class="about section" id="about" [attr.aria-label]="'about.title' | translate">
      <div class="container">
        <app-section-title
          [eyebrow]="'about.eyebrow' | translate"
        >
          {{ 'about.title' | translate }}
        </app-section-title>

        <div class="about__content">
          <!-- Bio -->
          <div class="about__bio" @fadeInUp>
            <p class="about__text">{{ 'about.bio.p1' | translate }}</p>
            <p class="about__text">{{ 'about.bio.p2' | translate }}</p>
            <p class="about__text">{{ 'about.bio.p3' | translate }}</p>
          </div>

          <!-- Stats -->
          <div class="about__stats" @staggerList>
            <div class="about__stat">
              <span class="about__stat-number">{{ animatedYears() }}+</span>
              <span class="about__stat-label">{{ 'about.stats.years' | translate }}</span>
            </div>
            <div class="about__stat">
              <span class="about__stat-number">{{ animatedTech() }}+</span>
              <span class="about__stat-label">{{ 'about.stats.technologies' | translate }}</span>
            </div>
            <div class="about__stat">
              <span class="about__stat-number">{{ animatedProjects() }}+</span>
              <span class="about__stat-label">{{ 'about.stats.projects' | translate }}</span>
            </div>
          </div>
        </div>

        <!-- Skills Marquee -->
        <div class="about__skills" @fadeInUp>
          <div class="about__marquee">
            <div class="about__marquee-track">
              @for (skill of skills; track skill.name) {
                <app-badge [variant]="'category'" [color]="getSkillColor(skill.category)">
                  {{ skill.name }}
                </app-badge>
              }
              <!-- Duplicate for seamless loop -->
              @for (skill of skills; track skill.name + '-dup') {
                <app-badge [variant]="'category'" [color]="getSkillColor(skill.category)">
                  {{ skill.name }}
                </app-badge>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .about {
      &__content {
        display: grid;
        gap: $spacing-2xl;

        @include lg {
          grid-template-columns: 1fr auto;
          gap: $spacing-3xl;
        }
      }

      &__bio {
        display: flex;
        flex-direction: column;
        gap: $spacing-lg;
      }

      &__text {
        @include body-large;
        color: var(--text-secondary);
      }

      &__stats {
        display: flex;
        gap: $spacing-xl;

        @include lg {
          flex-direction: column;
          gap: $spacing-lg;
        }
      }

      &__stat {
        display: flex;
        flex-direction: column;
        gap: $spacing-xs;
        text-align: center;

        @include lg {
          text-align: left;
        }
      }

      &__stat-number {
        font-size: $font-size-4xl;
        font-weight: $font-weight-bold;
        color: var(--primary);
        line-height: 1;
      }

      &__stat-label {
        font-size: $font-size-sm;
        color: var(--text-secondary);
      }

      &__skills {
        margin-top: $spacing-3xl;
        overflow: hidden;
        mask-image: linear-gradient(
          to right,
          transparent,
          black 10%,
          black 90%,
          transparent
        );
      }

      &__marquee {
        overflow: hidden;
      }

      &__marquee-track {
        display: flex;
        gap: $spacing-md;
        width: max-content;
        animation: marquee 40s linear infinite;

        @include reduced-motion {
          animation: none;
          flex-wrap: wrap;
          width: auto;
        }
      }
    }

    @keyframes marquee {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  `,
})
export class AboutComponent {
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private isBrowser = isPlatformBrowser(this.platformId);
  private animationTimer: ReturnType<typeof setInterval> | null = null;

  skills = SKILLS;
  stats = STATS;

  animatedYears = signal(0);
  animatedTech = signal(0);
  animatedProjects = signal(0);

  constructor() {
    if (this.isBrowser) {
      this.animateCounters();
    }

    this.destroyRef.onDestroy(() => {
      if (this.animationTimer) {
        clearInterval(this.animationTimer);
      }
    });
  }

  private animateCounters(): void {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    this.animationTimer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = this.easeOutQuart(progress);

      this.animatedYears.set(Math.round(this.stats.yearsExperience * eased));
      this.animatedTech.set(Math.round(this.stats.technologies * eased));
      this.animatedProjects.set(Math.round(this.stats.projects * eased));

      if (currentStep >= steps) {
        clearInterval(this.animationTimer!);
        this.animationTimer = null;
      }
    }, interval);
  }

  private easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - x, 4);
  }

  getSkillColor(category: string): string {
    const colors: Record<string, string> = {
      frontend: 'var(--primary)',
      backend: 'var(--teal)',
      ai: 'var(--indigo)',
      devops: 'var(--sky)',
      tools: 'var(--text-secondary)',
      methodologies: 'var(--warning)',
    };
    return colors[category] || 'var(--primary)';
  }
}
