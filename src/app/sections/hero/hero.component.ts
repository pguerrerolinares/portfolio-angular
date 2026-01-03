import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { PERSONAL_INFO } from '../../core/constants/portfolio-data';
import { fadeInUp, fadeIn, maskReveal, bounce } from '../../shared/animations/triggers';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, IconComponent],
  animations: [fadeInUp, fadeIn, maskReveal, bounce],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  personalInfo = PERSONAL_INFO;
}
