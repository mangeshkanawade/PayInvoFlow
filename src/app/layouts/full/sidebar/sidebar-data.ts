import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },

  {
    navCap: 'Company',
  },

  {
    displayName: 'Company',
    iconName: 'building-community',
    chip: true,
    route: '',
    children: [
      {
        displayName: 'List',
        iconName: 'list-search',
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        chipContent: 'PRO',
        route: '/company',
      },
      {
        displayName: 'Create',
        iconName: 'file-plus',
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        chipContent: 'PRO',
        route: '/company/create',
      },
    ],
  },
  {
    displayName: 'Invoice',
    iconName: 'file-invoice',
    chip: true,
    route: '',
    children: [
      {
        displayName: 'List',
        iconName: 'point',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        chipContent: 'PRO',
        route: '/https://modernize-angular-main.netlify.app/apps/invoice',
      },
      {
        displayName: 'Detail',
        iconName: 'point',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        chipContent: 'PRO',
        route:
          '/https://modernize-angular-main.netlify.app/apps/viewInvoice/101',
      },
      {
        displayName: 'Create',
        iconName: 'point',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        chipContent: 'PRO',
        route: '/https://modernize-angular-main.netlify.app/apps/addInvoice',
      },
      {
        displayName: 'Edit',
        iconName: 'point',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        chipContent: 'PRO',
        route:
          '/https://modernize-angular-main.netlify.app/apps/editinvoice/101',
      },
    ],
  },

  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Badge',
    iconName: 'archive',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'info-circle',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list-details',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'file-text',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'file-text-ai',
    route: '/ui-components/tooltips',
  },
  {
    displayName: 'Forms',
    iconName: 'clipboard-text',
    route: '/ui-components/forms',
  },
  {
    displayName: 'Tables',
    iconName: 'table',
    route: '/ui-components/tables',
  },
];
