import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic routes -> SSR (NOT prerender)
  {
    path: 'company/form/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'client/form',
    renderMode: RenderMode.Server,
  },

  // Catch-all -> prerender
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
