import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { PERSONAL_INFO } from '../../core/constants/portfolio-data';
import { fadeInUp, fadeIn, maskReveal, bounce } from '../../shared/animations/triggers';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, IconComponent],
  animations: [fadeInUp, fadeIn, maskReveal, bounce],
  template: `
    <section class="hero" id="hero" [attr.aria-label]="'hero.role' | translate">
      <!-- Background -->
      <div class="hero__background">
        <div class="hero__blob hero__blob--1"></div>
        <div class="hero__blob hero__blob--2"></div>
        <div class="hero__blob hero__blob--3"></div>
      </div>

      <div class="hero__content container">
        <!-- Main Content -->
        <div class="hero__main">
          <p class="hero__greeting" @fadeInUp>
            {{ 'hero.greeting' | translate }}
          </p>

          <h1 class="hero__name" @maskReveal>
            <span class="gradient-text">{{ personalInfo.name }}</span>
          </h1>

          <p class="hero__role" @fadeInUp>
            {{ 'hero.role' | translate }}
          </p>

          <p class="hero__description" @fadeInUp>
            {{ 'hero.description' | translate }}
          </p>

          <!-- CTAs -->
          <div class="hero__ctas" @fadeInUp>
            <a href="#projects" class="hero__cta-btn hero__cta-btn--primary">
              {{ 'hero.cta.projects' | translate }}
              <app-icon name="arrow-down" [size]="18" />
            </a>
            <a href="#contact" class="hero__cta-btn hero__cta-btn--outline">
              {{ 'hero.cta.contact' | translate }}
            </a>
          </div>

          <!-- Social Links -->
          <div class="hero__social" @fadeIn>
            <a
              [href]="personalInfo.social.github"
              target="_blank"
              rel="noopener noreferrer"
              class="hero__social-link"
              aria-label="GitHub"
            >
              <app-icon name="github" [size]="22" />
            </a>
            <a
              [href]="personalInfo.social.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="hero__social-link"
              aria-label="LinkedIn"
            >
              <app-icon name="linkedin" [size]="22" />
            </a>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="hero__scroll" @bounce>
          <span class="hero__scroll-text">{{ 'hero.scroll' | translate }}</span>
          <div class="hero__scroll-icon">
            <app-icon name="arrow-down" [size]="20" />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;

      &__background {
        position: absolute;
        inset: 0;
        overflow: hidden;
        z-index: -1;
      }

      &__blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.4;
        animation: float 20s ease-in-out infinite;

        @include reduced-motion {
          animation: none;
        }

        &--1 {
          width: 400px;
          height: 400px;
          background: $indigo;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        &--2 {
          width: 350px;
          height: 350px;
          background: $sky;
          top: 50%;
          right: 10%;
          animation-delay: -5s;
        }

        &--3 {
          width: 300px;
          height: 300px;
          background: var(--teal);
          bottom: 10%;
          left: 30%;
          animation-delay: -10s;
        }
      }

      &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 100vh;
        padding-top: 80px;
        padding-bottom: $spacing-2xl;
      }

      &__main {
        max-width: 800px;
      }

      &__greeting {
        font-size: $font-size-lg;
        color: var(--text-secondary);
        margin-bottom: $spacing-sm;

        @include md {
          font-size: $font-size-xl;
        }
      }

      &__name {
        @include heading-hero;
        margin-bottom: $spacing-md;
      }

      &__role {
        font-size: $font-size-2xl;
        font-weight: $font-weight-semibold;
        color: var(--text-primary);
        margin-bottom: $spacing-lg;

        @include md {
          font-size: $font-size-3xl;
        }
      }

      &__description {
        @include body-large;
        color: var(--text-secondary);
        max-width: 50ch;
        margin-bottom: $spacing-xl;
      }

      &__ctas {
        display: flex;
        flex-wrap: wrap;
        gap: $spacing-md;
        margin-bottom: $spacing-xl;
      }

      &__cta-btn {
        display: inline-flex;
        align-items: center;
        gap: $spacing-sm;
        padding: $spacing-sm $spacing-lg;
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        border-radius: $border-radius-full;
        text-decoration: none;
        transition: all $transition-base;

        &--primary {
          background: var(--primary);
          color: white;

          &:hover {
            filter: brightness(1.1);
            text-decoration: none;
          }
        }

        &--outline {
          background: transparent;
          color: var(--text-primary);
          border: $border-width solid var(--border);

          &:hover {
            background: var(--surface-hover);
            text-decoration: none;
          }
        }

        &:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
      }

      &__social {
        display: flex;
        gap: $spacing-md;
      }

      &__social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        color: var(--text-secondary);
        border-radius: $border-radius-full;
        transition: all $transition-fast;

        &:hover {
          color: var(--text-primary);
          background: var(--surface-hover);
          transform: translateY(-2px);
          text-decoration: none;
        }
      }

      &__scroll {
        position: absolute;
        bottom: $spacing-xl;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: $spacing-sm;
        color: var(--text-secondary);
        animation: bounceScroll 2s ease-in-out infinite;

        @include reduced-motion {
          animation: none;
        }
      }

      &__scroll-text {
        font-size: $font-size-xs;
        text-transform: uppercase;
        letter-spacing: $letter-spacing-wide;
      }

      &__scroll-icon {
        display: flex;
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      33% {
        transform: translate(30px, -40px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.95);
      }
    }

    @keyframes bounceScroll {
      0%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      50% {
        transform: translateX(-50%) translateY(10px);
      }
    }
  `,
})
export class HeroComponent {
  personalInfo = PERSONAL_INFO;
}
