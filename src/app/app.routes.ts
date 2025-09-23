import { Routes } from '@angular/router';
import { CreateClient } from './components/client/create-client/create-client';
import { SearchClient } from './components/client/search-client/search-client';
import { CreateCompany } from './components/company/create-company/create-company';
import { SearchCompany } from './components/company/search-company/search-company';
import { CreateInvoice } from './components/invoice/create-invoice/create-invoice';
import { NotFound } from './components/notfound/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'company',
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: SearchCompany,
        title: 'Company',
      },
      {
        path: 'form',
        component: CreateCompany,
        title: 'Company Form',
      },
      {
        path: 'form/:id',
        component: CreateCompany,
        title: 'Company Form',
      },
    ],
  },

  {
    path: 'client',
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: SearchClient,
        title: 'Clients',
      },
      {
        path: 'form',
        component: CreateClient,
        title: 'Client Form',
      },
      {
        path: 'form/:id',
        component: CreateClient,
        title: 'Client Form',
      },
    ],
  },

  {
    path: 'invoice',
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: SearchCompany,
        title: 'Invoice',
      },
      {
        path: 'form',
        component: CreateInvoice,
        title: 'Invoice Form',
      },
      {
        path: 'form/:id',
        component: CreateInvoice,
        title: 'Invoice Form',
      },
    ],
  },

  {
    path: 'notfound',
    component: NotFound,
  },

  {
    path: '**',
    component: NotFound,
  },
];
