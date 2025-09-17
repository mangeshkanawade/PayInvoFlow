import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Client } from '../../../models/client.model';
import { SharedModule } from '../../../modules/shared.module';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-create-client',
  imports: [SharedModule],
  templateUrl: './create-client.html',
  styleUrl: './create-client.scss',
})
export class CreateClient implements OnInit {
  clientForm!: FormGroup;
  isSubmitting = false;

  states = [{ value: 'Maharashtra', name: 'Maharashtra', code: '27' }];

  statues = [
    { name: 'Active', code: 'Active' },
    { name: 'Inactive', code: 'Inactive' },
  ];

  clientService = inject(ClientService);
  messageService = inject(MessageService);
  route = inject(ActivatedRoute);
  clientId?: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/), // Indian 10-digit numbers starting with 6-9
        ],
      ],
      gstin: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/), // GSTIN format
        ],
      ],
      state: [null, Validators.required],
      stateCode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{2}$/), // Only 2-digit state code
        ],
      ],
      status: ['Active', [Validators.required]],
    });

    this.clientForm.get('state')?.valueChanges.subscribe((state: any) => {
      if (state) {
        this.clientForm.patchValue({
          stateCode: this.states.find((s) => s.name === state)?.code,
        });
      }
    });

    this.route.paramMap.subscribe((params) => {
      this.clientId = params.get('id') || undefined;
      if (this.clientId) {
        this.loadClient(this.clientId);
      }
    });
  }

  onSubmit() {
    if (this.clientForm.invalid) return;

    if (this.clientForm.valid) {
      console.log('Form Value:', this.clientForm.value);
      this.clientId ? this.updateCompany() : this.saveCompany();
    } else {
      this.clientForm.markAllAsTouched();
    }
  }

  saveCompany() {
    const client: Client = {
      ...this.clientForm.value,
    };

    this.clientService.createClient(client).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        console.log('Client created successfully:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Client created successfully',
        });

        this.resetForm();
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error creating company:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error creating company',
        });
      },
    });
  }

  loadClient(id: string) {
    this.isSubmitting = true;
    this.clientService.getClientById(id).subscribe({
      next: (company) => {
        this.isSubmitting = false;
        this.clientForm.patchValue(company);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Error loading company:', err);
      },
    });
  }

  updateCompany() {
    if (!this.clientId) return;
    this.isSubmitting = true;
    const client: Client = {
      ...this.clientForm.value,
    };
    this.clientService.updateClient(this.clientId, client).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Client updated successfully',
        });
        this.resetForm();
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error updating client:', error);
      },
    });
  }

  getErrorMessage(field: string): string {
    const control = this.clientForm.get(field);

    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      return `${this.toLabel(field)} is required`;
    }
    if (control.errors['minlength']) {
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    }
    if (control.errors['maxlength']) {
      return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed`;
    }
    if (control.errors['pattern']) {
      switch (field) {
        case 'phone':
          return 'Enter valid 10-digit phone number';
        case 'gstin':
          return 'Enter valid 15-character GSTIN';
        case 'stateCode':
          return 'Enter 2-digit numeric state code';
        case 'accountNumber':
          return 'Must be 9–18 digit number';
        case 'ifscCode':
          return 'Invalid IFSC format (e.g., HDFC0001234)';
      }
    }

    return 'Invalid input';
  }

  private toLabel(field: string): string {
    const map: any = {
      name: 'Company name',
      email: 'Email',
      phone: 'Phone number',
      gstin: 'GSTIN',
      state: 'State',
      stateCode: 'State code',
      bankName: 'Bank name',
      bankBranch: 'Branch name',
      accountNumber: 'Account number',
      ifscCode: 'IFSC code',
      address: 'Address',
      status: 'Status',
    };
    return map[field] || field;
  }

  resetForm(): void {
    this.clientForm.reset();
  }
}
