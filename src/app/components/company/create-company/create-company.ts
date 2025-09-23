import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedModule } from '../../../modules/shared.module';
import { CompanyService } from './../../../services/company.service';

@Component({
  selector: 'app-create-company',
  imports: [SharedModule],
  templateUrl: './create-company.html',
  styleUrl: './create-company.scss',
})
export class CreateCompany implements OnInit {
  companyForm!: FormGroup;

  states = [{ value: 'Maharashtra', name: 'Maharashtra', code: '27' }];

  statues = [
    { name: 'Active', code: 'Active' },
    { name: 'Inactive', code: 'Inactive' },
  ];

  selectedLogoFile?: File;
  logoFile?: File;
  isSubmitting = false;

  companyService = inject(CompanyService);
  messageService = inject(MessageService);
  route = inject(ActivatedRoute);
  companyId?: string;

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
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
      bankName: ['', [Validators.required, Validators.minLength(3)]],
      bankBranch: ['', [Validators.required, Validators.minLength(3)]],
      accountNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{9,18}$/), // 9–18 digit account number
        ],
      ],
      ifscCode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/), // IFSC format: XXXX0YYYYYY
        ],
      ],
      status: ['Active', [Validators.required]],
      invoicePrefix: ['Invoice-', [Validators.required]],
      cgstRate: [8, [Validators.required, Validators.min(3), Validators.max(100)]],
      sgstRate: [8, [Validators.required, Validators.min(3), Validators.max(100)]],
      logo: [null],
    });
  }

  ngOnInit(): void {
    this.companyForm.get('state')?.valueChanges.subscribe((state: any) => {
      if (state) {
        this.companyForm.patchValue({
          stateCode: this.states.find((s) => s.name === state)?.code,
        });
      }
    });

    // ✅ check if editing
    this.route.paramMap.subscribe((params) => {
      this.companyId = params.get('id') || undefined;
      if (this.companyId) {
        this.loadCompany(this.companyId);
      }
    });
  }

  loadCompany(id: string) {
    this.isSubmitting = true;
    this.companyService.getCompanyById(id).subscribe({
      next: (company) => {
        this.isSubmitting = false;
        this.companyForm.patchValue(company);
        if (company.logo) {
          this.selectedLogoFile = company.logo; // existing logo URL
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Error loading company:', err);
      },
    });
  }

  updateCompany() {
    if (!this.companyId) return;
    const formData = this.buildFormData();
    this.isSubmitting = true;
    this.companyService.updateCompany(this.companyId, formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Company updated successfully',
        });
        this.resetForm();
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error updating company:', error);
      },
    });
  }

  buildFormData(): FormData {
    const formData = new FormData();
    Object.keys(this.companyForm.value).forEach((key) => {
      formData.append(key, this.companyForm.value[key]);
    });
    if (this.logoFile) {
      formData.append('logo', this.logoFile, this.logoFile.name);
    }
    return formData;
  }

  resetForm() {
    this.companyForm.reset();
    this.selectedLogoFile = undefined;
    this.logoFile = undefined;
    this.companyId = undefined;
  }

  getErrorMessage(field: string): string {
    const control = this.companyForm.get(field);

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
          return 'Enter valid 15-character GSTIN fomat (e.g., 27AAAPA1234A1Z5)';
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

  onSubmit() {
    if (this.companyForm.valid) {
      console.log('Form Value:', this.companyForm.value);
      this.companyId ? this.updateCompany() : this.saveCompany();
    } else {
      this.companyForm.markAllAsTouched();
    }
  }

  saveCompany() {
    const formData = new FormData();
    Object.keys(this.companyForm.value).forEach((key) => {
      formData.append(key, this.companyForm.value[key]);
    });
    if (this.logoFile) {
      formData.append('logo', this.logoFile, this.logoFile.name);
    }
    this.isSubmitting = true;
    this.companyService.createCompany(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        console.log('Company created successfully:', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Company created successfully',
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

  onLogoSelect(event: any) {
    const file: File = event.files?.[0];
    if (file) {
      this.logoFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedLogoFile = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
