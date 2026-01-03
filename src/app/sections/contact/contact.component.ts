import { Component, signal, inject, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';
import { ContactCardComponent } from './contact-card.component';
import { PERSONAL_INFO } from '../../core/constants/portfolio-data';
import { fadeInUp, staggerList } from '../../shared/animations/triggers';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    SectionTitleComponent,
    ContactCardComponent,
  ],
  animations: [fadeInUp, staggerList],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
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
