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

  {
    path: 'notfound',
    renderMode: RenderMode.Server,
    status: 400,
    headers: {
      'Cache-Control': 'no-cache',
    },
  },

  // Catch-all -> prerender
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
