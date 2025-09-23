import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedModule } from '../../../modules/shared.module';

@Component({
  selector: 'app-header',
  imports: [SharedModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Comapny',
        icon: 'pi pi-briefcase',
        items: [
          { label: 'Search', icon: 'pi pi-search', routerLink: '/company/search' },
          { label: 'Create', icon: 'pi pi-plus', routerLink: '/company/form' },
        ],
      },

      {
        label: 'Client',
        icon: 'pi pi-users',
        items: [
          { label: 'Search', icon: 'pi pi-search', routerLink: '/client/search' },
          { label: 'Create', icon: 'pi pi-plus', routerLink: '/client/form' },
        ],
      },

      {
        label: 'Invoice',
        icon: 'pi pi-envelope',
        items: [
          { label: 'Search', icon: 'pi pi-search', routerLink: '/invoice/search' },
          { label: 'Create', icon: 'pi pi-plus', routerLink: '/invoice/form' },
        ],
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        routerLink: '/contact',
      },
      {
        label: 'About',
        icon: 'pi pi-info-circle',
        routerLink: '/about',
      },
    ];
  }
}
