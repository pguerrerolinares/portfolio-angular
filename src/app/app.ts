import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// Layout
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

// Sections
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { ContactComponent } from './sections/contact/contact.component';

// Services
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateModule,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private translate = inject(TranslateService);
  private themeService = inject(ThemeService);

  constructor() {
    // Set default language
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }
}
