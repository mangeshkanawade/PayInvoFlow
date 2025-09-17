import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationsService } from './http-operations.service';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private baseUrl = 'Clients'; // Base API endpoint

  constructor(private http: HttpOperationsService) {}

  /** GET all clients */
  getClients(): Observable<any> {
    return this.http.getAPI(`${this.baseUrl}`);
  }

  /** GET a single client by ID */
  getClientById(id: string): Observable<any> {
    return this.http.getAPI(`${this.baseUrl}/${id}`);
  }

  /** CREATE a new client */
  createClient(data: any): Observable<any> {
    return this.http.postAPI(`${this.baseUrl}`, data);
  }

  /** UPDATE an existing client */
  updateClient(id: string, data: any): Observable<any> {
    return this.http.putAPI(`${this.baseUrl}/${id}`, data);
  }

  /** DELETE a client by ID */
  deleteClient(id: string): Observable<any> {
    return this.http.deleteAPI(`${this.baseUrl}/${id}`);
  }
}
