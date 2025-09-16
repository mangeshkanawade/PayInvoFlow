// Import PrimeNG modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeNGImportsModule } from './primeNGImports.module';

@NgModule({
  imports: [CommonModule, RouterModule, PrimeNGImportsModule],
  exports: [CommonModule, RouterModule, PrimeNGImportsModule],
  providers: [],
})
export class SharedModule {}
