import { Component, signal, inject, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';
import { ContactCardComponent } from './contact-card.component';
import { PERSONAL_INFO } from '../../core/constants/portfolio-data';
import { fadeInUp, staggerList } from '../../shared/animations/triggers';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    SectionTitleComponent,
    ContactCardComponent,
  ],
  animations: [fadeInUp, staggerList],
  template: `
    <section class="contact section" id="contact" [attr.aria-label]="'contact.title' | translate">
      <div class="container">
        <app-section-title
          [eyebrow]="'contact.eyebrow' | translate"
          [description]="'contact.description' | translate"
          [centered]="true"
        >
          {{ 'contact.title' | translate }}
        </app-section-title>

        <!-- Contact Cards Grid -->
        <div class="contact__grid" @staggerList>
          <!-- Email -->
          <app-contact-card
            icon="email"
            [label]="'contact.email.label' | translate"
            [value]="personalInfo.email"
            [copyable]="true"
            accentColor="var(--primary)"
            (onCopy)="showCopiedMessage()"
          />

          <!-- GitHub -->
          <app-contact-card
            icon="github"
            [label]="'contact.github.label' | translate"
            value="@pguerrerolinares"
            [href]="personalInfo.social.github"
            accentColor="var(--social-github)"
          />

          <!-- LinkedIn -->
          <app-contact-card
            icon="linkedin"
            [label]="'contact.linkedin.label' | translate"
            value="Paul Guerrero Linares"
            [href]="personalInfo.social.linkedin"
            accentColor="var(--social-linkedin)"
          />

          <!-- Location -->
          <app-contact-card
            icon="location"
            [label]="'contact.location.label' | translate"
            [value]="personalInfo.location"
            accentColor="var(--teal)"
          />
        </div>

        <!-- Availability -->
        <div class="contact__availability" @fadeInUp>
          <div class="contact__availability-indicator">
            <span class="contact__pulse"></span>
            <span class="contact__availability-text">
              {{ 'contact.availability.title' | translate }}
            </span>
          </div>
          <p class="contact__availability-description">
            {{ 'contact.availability.description' | translate }}
          </p>
        </div>

        <!-- Toast -->
        @if (showToast()) {
          <div class="contact__toast" @fadeInUp>
            {{ 'contact.email.copied' | translate }}
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .contact {
      &__grid {
        display: grid;
        gap: $spacing-md;
        max-width: 800px;
        margin-inline: auto;

        @include sm {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      &__availability {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: $spacing-sm;
        margin-top: $spacing-3xl;
        text-align: center;
      }

      &__availability-indicator {
        display: inline-flex;
        align-items: center;
        gap: $spacing-sm;
        padding: $spacing-sm $spacing-md;
        background: rgba(13, 148, 136, 0.1);
        border-radius: $border-radius-full;
      }

      &__pulse {
        width: 10px;
        height: 10px;
        background: var(--teal);
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
      }

      &__availability-text {
        font-size: $font-size-sm;
        font-weight: $font-weight-medium;
        color: var(--teal);
      }

      &__availability-description {
        font-size: $font-size-sm;
        color: var(--text-secondary);
      }

      &__toast {
        position: fixed;
        bottom: $spacing-xl;
        left: 50%;
        transform: translateX(-50%);
        padding: $spacing-sm $spacing-lg;
        background: var(--surface);
        color: var(--text-primary);
        border: $border-width solid var(--border);
        border-radius: $border-radius-full;
        box-shadow: $shadow-lg;
        z-index: $z-index-tooltip;
      }
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.3);
      }
    }
  `,
})
export class ContactComponent {
  private destroyRef = inject(DestroyRef);

  personalInfo = PERSONAL_INFO;
  showToast = signal(false);

  showCopiedMessage(): void {
    this.showToast.set(true);
    const timeoutId = setTimeout(() => {
      this.showToast.set(false);
    }, 2000);

    this.destroyRef.onDestroy(() => clearTimeout(timeoutId));
  }
}
