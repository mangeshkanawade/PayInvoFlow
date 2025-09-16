import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../../../modules/shared.module';

interface Client {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
  state: string;
  stateCode: string;
  status?: string;
}
@Component({
  selector: 'app-search-client',
  imports: [SharedModule],
  templateUrl: './search-client.html',
  styleUrl: './search-client.scss',
})
export class SearchClient {
  displayEditDialog: boolean = false;
  editForm: FormGroup;
  selectedClient!: Client;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.editForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
    });
  }

  clients: Client[] = [
    {
      id: '1',
      name: 'HORA Industries',
      address: '123 Market Street, Pune',
      email: 'kanawade84@gmail.com',
      phone: '+91-9123456780',
      gstin: '27ABCDE1234F1Z5',
      state: 'Maharashtra',
      stateCode: '27',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Zenith Solutions',
      address: '45 MG Road, Mumbai',
      email: 'contact@zenith.com',
      phone: '+91-9988776655',
      gstin: '27XYZAB1234C1Z6',
      state: 'Maharashtra',
      stateCode: '27',
      status: 'Inactive',
    },
    {
      id: '3',
      name: 'Delta Enterprises',
      address: '78 Station Road, Pune',
      email: 'info@delta.com',
      phone: '+91-9876543210',
      gstin: '27LMNOP1234Q1Z7',
      state: 'Maharashtra',
      stateCode: '27',
      status: 'Active',
    },
    {
      id: '4',
      name: 'Apex Technologies',
      address: '12 Park Avenue, Bangalore',
      email: 'support@apextech.com',
      phone: '+91-9234567890',
      gstin: '29ABCDE1234F1Z8',
      state: 'Karnataka',
      stateCode: '29',
      status: 'Active',
    },
    {
      id: '5',
      name: 'Blue Ocean Pvt Ltd',
      address: '34 Lake View, Chennai',
      email: 'contact@blueocean.com',
      phone: '+91-9123456781',
      gstin: '33XYZAB1234C1Z9',
      state: 'Tamil Nadu',
      stateCode: '33',
      status: 'Inactive',
    },
    {
      id: '6',
      name: 'Sunrise Traders',
      address: '56 Hill Street, Hyderabad',
      email: 'sales@sunrisetraders.com',
      phone: '+91-9988771122',
      gstin: '36LMNOP1234Q1Z0',
      state: 'Telangana',
      stateCode: '36',
      status: 'Active',
    },
    {
      id: '7',
      name: 'NextGen Solutions',
      address: '78 Ring Road, Pune',
      email: 'info@nextgen.com',
      phone: '+91-9876543299',
      gstin: '27ABCDE5678F1Z1',
      state: 'Maharashtra',
      stateCode: '27',
      status: 'Active',
    },
    {
      id: '8',
      name: 'Alpha Enterprises',
      address: '90 Market Street, Delhi',
      email: 'contact@alpha.com',
      phone: '+91-9123344556',
      gstin: '07XYZAB9876C1Z2',
      state: 'Delhi',
      stateCode: '07',
      status: 'Inactive',
    },
    {
      id: '9',
      name: 'Omega Industries',
      address: '22 MG Road, Mumbai',
      email: 'support@omega.com',
      phone: '+91-9988001122',
      gstin: '27LMNOP5678Q1Z3',
      state: 'Maharashtra',
      stateCode: '27',
      status: 'Active',
    },
    {
      id: '10',
      name: 'Prime Traders',
      address: '11 Park Avenue, Bangalore',
      email: 'sales@primetraders.com',
      phone: '+91-9123457799',
      gstin: '29ABCDE5678F1Z4',
      state: 'Karnataka',
      stateCode: '29',
      status: 'Active',
    },
  ];

  loading: boolean = false;
  getSeverity(status: string) {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'danger';
      default:
        return 'info';
    }
  }

  openEditDialog(client: Client) {
    this.selectedClient = client;
    this.editForm.patchValue(client);
    this.displayEditDialog = true;
  }

  saveClient() {
    Object.assign(this.selectedClient, this.editForm.value);
    this.displayEditDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Saved',
      detail: 'Client updated successfully',
    });
  }

  confirmDelete(client: Client) {
    this.confirmationService.confirm({
      header: 'Delete Confirmation', // ✅ Title of the confirmation dialog
      message: `Are you sure you want to delete ${client.name}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.clients = this.clients.filter((c) => c.id !== client.id);

        this.messageService.add({
          severity: 'success',
          summary: 'Client Deleted', // ✅ Title of the toast
          detail: `${client.name} deleted successfully`,
          life: 10000, // ✅ Toast duration in milliseconds (10 seconds)
        });
      },
    });
  }

  exitClient(client: Client) {
    // Optional: navigate or just show a message
    this.messageService.add({
      severity: 'info',
      summary: 'Exit',
      detail: `Exited from ${client.name}`,
    });
  }
}
