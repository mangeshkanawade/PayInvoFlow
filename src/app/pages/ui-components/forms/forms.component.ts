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

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-forms',
  imports: [
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
  templateUrl: './forms.component.html',
})
export class AppFormsComponent {
  companyForm: FormGroup;

  stateList: any[] = [
    { value: 'MH', viewValue: 'Maharashtra' },
    { value: 'DL', viewValue: 'Delhi' },
    { value: 'KA', viewValue: 'Karnataka' },
    { value: 'TN', viewValue: 'Tamil Nadu' },
  ];

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gstin: ['', Validators.required],
      state: ['', Validators.required],
      stateCode: ['', Validators.required],
      bankName: ['', Validators.required],
      bankBranch: ['', Validators.required],
      accountNumber: ['', Validators.required],
      ifscCode: ['', Validators.required],
      logo: [''],
    });
  }

  onSubmit() {
    if (this.companyForm.valid) {
      console.log('Company Data:', this.companyForm.value);
      // 🔥 Send data to backend API here
    } else {
      this.companyForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.companyForm.reset();
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log('Selected file:', file);
      this.companyForm.patchValue({ logo: file.name }); // store filename
      this.companyForm.get('logo')?.updateValueAndValidity();
    }
  }
}
