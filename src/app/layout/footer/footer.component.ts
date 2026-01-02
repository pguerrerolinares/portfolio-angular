import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { PERSONAL_INFO } from '../../core/constants/portfolio-data';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, IconComponent],
  template: `
    <footer class="footer">
      <div class="footer__content container">
        <!-- Social Links -->
        <div class="footer__social">
          <a
            [href]="personalInfo.social.github"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="GitHub"
          >
            <app-icon name="github" [size]="20" />
          </a>
          <a
            [href]="personalInfo.social.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="LinkedIn"
          >
            <app-icon name="linkedin" [size]="20" />
          </a>
        </div>

        <!-- Copyright -->
        <p class="footer__copyright">
          {{ 'footer.copyright' | translate: { year: currentYear } }}
        </p>

        <!-- Built with -->
        <p class="footer__built-with">
          {{ 'footer.builtWith' | translate }}
        </p>
      </div>
    </footer>
  `,
  styles: `
    @use 'styles/variables' as *;
    @use 'styles/mixins' as *;

    .footer {
      border-top: $border-width solid var(--border);
      padding: $spacing-2xl 0;
      margin-top: auto;

      &__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: $spacing-md;
        text-align: center;
      }

      &__social {
        display: flex;
        gap: $spacing-md;
      }

      &__social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        color: var(--text-secondary);
        border-radius: $border-radius-full;
        transition: all $transition-fast;

        &:hover {
          color: var(--text-primary);
          background: var(--surface-hover);
          text-decoration: none;
        }
      }

      &__copyright {
        font-size: $font-size-sm;
        color: var(--text-secondary);
      }

      &__built-with {
        font-size: $font-size-xs;
        color: var(--text-secondary);
        opacity: 0.7;
      }
    }
  `,
})
export class FooterComponent {
  personalInfo = PERSONAL_INFO;
  currentYear = new Date().getFullYear();
}
