import { Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CreateCompanyComponent } from './create-company/create-company.component';

export const CompanyRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CompanyComponent,
      },
      {
        path: 'create',
        component: CreateCompanyComponent,
      },
    ],
  },
];
