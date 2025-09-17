import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client } from '../../../models/client.model';
import { SharedModule } from '../../../modules/shared.module';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-search-client',
  imports: [SharedModule],
  templateUrl: './search-client.html',
  styleUrl: './search-client.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchClient {
  displayEditDialog: boolean = false;
  selectedClient!: Client;
  clients: Client[] = [];

  clientService = inject(ClientService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  private router: Router = inject(Router);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {}

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

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.loading = true;
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = [...data];
        this.loading = false;
        this.cd.markForCheck();
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.cd.markForCheck();
      },
    });
  }

  editClient(client: Client) {
    this.router.navigate(['/client/form', client._id]);
  }

  confirmDelete(client: Client) {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: `Are you sure you want to delete ${client.name}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.clients = this.clients.filter((c) => c._id !== client._id);
        this.cd.markForCheck();
        this.deleteClient(client._id);
      },
    });
  }

  deleteClient(id: string) {
    this.clientService.deleteClient(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Client deleted successfully',
        });
        this.getClients();
      },
      error: (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete client',
        });
        this.cd.markForCheck();
      },
    });
  }
}
