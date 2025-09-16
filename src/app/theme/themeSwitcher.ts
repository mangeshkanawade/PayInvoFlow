import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, computed, effect, inject, PLATFORM_ID, signal } from '@angular/core';

export interface ThemeState {
  darkTheme: boolean;
}

@Component({
  selector: 'theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-2 flex justify-end">
      <button
        type="button"
        class="inline-flex w-10 h-10 items-center justify-center rounded border"
        (click)="toggleTheme()"
      >
        <i [ngClass]="'pi ' + iconClass()" class="text-lg"></i>
      </button>
    </div>
  `,
})
export class ThemeSwitcher {
  private readonly STORAGE_KEY = 'themeSwitcherState';

  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  // state
  themeState = signal<ThemeState>(this.loadThemeState());

  // icon (sun = light mode active, moon = dark mode active)
  iconClass = computed(() => (this.themeState().darkTheme ? 'pi-sun' : 'pi-moon'));

  constructor() {
    effect(() => {
      const state = this.themeState();
      this.applyTheme(state.darkTheme);
      this.saveThemeState(state);
    });
  }

  toggleTheme() {
    this.themeState.update((state) => ({
      darkTheme: !state.darkTheme,
    }));
  }

  private applyTheme(dark: boolean) {
    if (dark) {
      this.document.documentElement.classList.add('p-dark');
    } else {
      this.document.documentElement.classList.remove('p-dark');
    }
  }

  private loadThemeState(): ThemeState {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    }
    return { darkTheme: false };
  }

  private saveThemeState(state: ThemeState) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }
  }
}
