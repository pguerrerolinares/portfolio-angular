import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';
import { ProjectCardComponent } from './project-card.component';
import { PROJECTS } from '../../core/constants/portfolio-data';
import { fadeInUp, staggerList } from '../../shared/animations/triggers';

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateModule,
    SectionTitleComponent,
    ProjectCardComponent,
  ],
  animations: [fadeInUp, staggerList],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  featuredProjects = computed(() => PROJECTS.filter((p) => p.featured));
  otherProjects = computed(() => PROJECTS.filter((p) => !p.featured));
}
