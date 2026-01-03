import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';
import { ExperienceCardComponent } from './experience-card.component';
import { EXPERIENCES } from '../../core/constants/portfolio-data';
import { fadeInLeft, fadeInRight } from '../../shared/animations/triggers';

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    SectionTitleComponent,
    ExperienceCardComponent,
  ],
  animations: [fadeInLeft, fadeInRight],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  experiences = EXPERIENCES;
}
