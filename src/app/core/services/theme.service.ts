import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'portfolio-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Internal state
  private _theme = signal<Theme>('system');
  private _systemPrefersDark = signal<boolean>(false);

  // Public readonly signals
  readonly theme = this._theme.asReadonly();

  readonly effectiveTheme = computed<'light' | 'dark'>(() => {
    const theme = this._theme();
    if (theme === 'system') {
      return this._systemPrefersDark() ? 'dark' : 'light';
    }
    return theme;
  });

  readonly isDark = computed(() => this.effectiveTheme() === 'dark');

  constructor() {
    if (this.isBrowser) {
      // Load saved theme preference
      this.loadSavedTheme();

      // Listen to system preference changes
      this.setupSystemPreferenceListener();

      // Apply theme whenever it changes
      effect(() => {
        this.applyTheme(this.effectiveTheme());
      });
    }
  }

  setTheme(theme: Theme): void {
    this._theme.set(theme);
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }

  toggleTheme(): void {
    const current = this.effectiveTheme();
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }

  private loadSavedTheme(): void {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      this._theme.set(saved);
    }

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this._systemPrefersDark.set(prefersDark);
  }

  private setupSystemPreferenceListener(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', (e) => {
      this._systemPrefersDark.set(e.matches);
    });
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    if (!this.isBrowser) return;

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    // Also update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#000000' : '#f5f5f7'
      );
    }
  }
}
