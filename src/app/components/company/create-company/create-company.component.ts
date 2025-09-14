import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-create-company',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss',
})
export class CreateCompanyComponent {
  companyForm: FormGroup;
  stateList = [
    { value: 'MH', viewValue: 'Maharashtra' },
    { value: 'DL', viewValue: 'Delhi' },
    { value: 'KA', viewValue: 'Karnataka' },
    // Add all states as needed
  ];
  selectedFile?: File;

  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gstin: ['', Validators.required],
      state: ['', Validators.required],
      stateCode: ['', Validators.required],
      bankName: ['', Validators.required],
      bankBranch: ['', Validators.required],
      accountNumber: ['', Validators.required],
      ifscCode: ['', Validators.required],
      logo: [null],
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.companyForm.patchValue({ logo: this.selectedFile });
    }
  }

  submitForm() {
    if (this.companyForm.invalid) return;

    const formValue = { ...this.companyForm.value };

    // Convert file to Base64 if selected
    const file: File | null = this.selectedFile || null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        formValue.logo = reader.result as string; // Base64 string

        // Send JSON payload
        this.companyService.createCompany(formValue).subscribe(
          (res) => console.log('Company created', res),
          (err) => console.error(err)
        );
      };
      reader.readAsDataURL(file); // Reads file as Base64
    } else {
      // No file, send directly
      this.companyService.createCompany(formValue).subscribe(
        (res) => console.log('Company created', res),
        (err) => console.error(err)
      );
    }
  }
}
