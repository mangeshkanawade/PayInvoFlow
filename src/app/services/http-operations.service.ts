import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpOperationsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAPI(url: string) {
    let headers = this.GetHeader();
    let httpOptions: any;

    httpOptions = { headers: headers };

    return this.http.get(this.baseUrl + url, {
      ...httpOptions,
    });
  }

  postAPI(url: string, data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + url, data);
  }

  deleteAPI(url: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + url);
  }

  putAPI(url: string, data: any) {
    return this.http.put(this.baseUrl + url, data);
  }

  postDownloadFileAPI(url: string, data: any): Observable<HttpEvent<Blob>> {
    let headers = this.GetHeader();

    return this.http.request(
      new HttpRequest('POST', this.baseUrl + url, data, {
        headers: headers,
        reportProgress: true,
        responseType: 'blob',
      }),
    );
  }

  getDownloadFileAPI(url: string): Observable<Blob> {
    return this.http.get(this.baseUrl + url, { responseType: 'blob' });
  }

  UploadFile(url: string, formData: any) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', []);
    return this.http.post(this.baseUrl + url, formData, {
      headers: headers,
      responseType: 'text',
    });
  }

  private GetHeader(): any {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }
}
