import { Component, signal, PLATFORM_ID, inject, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SectionTitleComponent } from '../../shared/ui/section-title/section-title.component';
import { BadgeComponent } from '../../shared/ui/badge/badge.component';
import { SKILLS, STATS } from '../../core/constants/portfolio-data';
import { fadeInUp, staggerList } from '../../shared/animations/triggers';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, SectionTitleComponent, BadgeComponent],
  animations: [fadeInUp, staggerList],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
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
      frontend: 'var(--arcade-cyan)',
      backend: 'var(--primary)',
      ai: 'var(--arcade-yellow)',
      devops: 'var(--arcade-magenta)',
      tools: 'var(--phosphor-amber)',
      methodologies: 'var(--arcade-orange)',
    };
    return colors[category] || 'var(--primary)';
  }
}
