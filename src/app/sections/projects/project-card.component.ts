import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from '../../shared/ui/card/card.component';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';
import { IconComponent } from '../../shared/ui/icon/icon.component';
import { Project, getProjectCategoryColor } from '../../core/constants/portfolio-data';

@Component({
  selector: 'app-project-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, CardComponent, BadgeComponent, IconComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
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
