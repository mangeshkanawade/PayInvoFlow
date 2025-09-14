import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationsService } from './http-operations.service';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private baseUrl = 'Company'; // Base API endpoint

  constructor(private http: HttpOperationsService) {}

  /** GET all companies */
  getCompanies(): Observable<any> {
    return this.http.getAPI(`${this.baseUrl}`);
  }

  /** GET a single company by ID */
  getCompanyById(id: string): Observable<any> {
    return this.http.getAPI(`${this.baseUrl}/${id}`);
  }

  /** CREATE a new company */
  createCompany(data: any): Observable<any> {
    return this.http.postAPI(`${this.baseUrl}`, data);
  }

  /** UPDATE an existing company */
  updateCompany(id: string, data: any): Observable<any> {
    return this.http.putAPI(`${this.baseUrl}/${id}`, data);
  }

  /** DELETE a company by ID */
  deleteCompany(id: string): Observable<any> {
    return this.http.deleteAPI(`${this.baseUrl}/${id}`);
  }
}
