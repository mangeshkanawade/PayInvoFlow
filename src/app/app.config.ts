import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import Lara from '@primeuix/themes/lara';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Lara, options: { darkModeSelector: '.p-dark' } },
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ],
};
