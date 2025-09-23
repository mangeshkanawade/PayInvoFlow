import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationsService } from './http-operations.service';

@Injectable({ providedIn: 'root' })
export class InvoiceItemsService {
  private readonly baseUrl = 'invoice-items'; // Base API endpoint

  constructor(private http: HttpOperationsService) {}

  /** GET all invoice items */
  getAll(): Observable<any> {
    return this.http.getAPI(`${this.baseUrl}`);
  }

  /** GET a single invoice item by ID */
  getById(id: string): Observable<any> {
    return this.http.getAPI(`${this.baseUrl}/${id}`);
  }

  /** CREATE a new invoice item */
  create(data: any): Observable<any> {
    return this.http.postAPI(`${this.baseUrl}`, data);
  }

  /** UPDATE an existing invoice item */
  update(id: string, data: any): Observable<any> {
    return this.http.putAPI(`${this.baseUrl}/${id}`, data);
  }

  /** DELETE an invoice item by ID */
  delete(id: string): Observable<any> {
    return this.http.deleteAPI(`${this.baseUrl}/${id}`);
  }
}
