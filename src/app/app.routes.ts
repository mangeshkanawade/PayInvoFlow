import { Routes } from '@angular/router';
import { SearchClient } from './components/client/search-client/search-client';
import { CreateCompany } from './components/company/create-company/create-company';
import { SearchCompany } from './components/company/search-company/search-company';
import { NotFound } from './components/notfound/not-found';

export const routes: Routes = [
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
        component: CreateCompany,
        title: 'Client Form',
      },
    ],
  },

  {
    path: 'notfound',
    component: NotFound,
  },

  {
    path: '**',
    redirectTo: 'notfound',
  },
];
