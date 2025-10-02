import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Optional: replace with your token service
@Injectable({ providedIn: 'root' })
export class TokenService {
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Example: fetch token from localStorage
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private tokenService = inject(TokenService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1️⃣ Clone request and attach token if exists
    const token = this.tokenService.getToken();
    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // send cookies for CORS requests
      });
    } else {
      // Still include credentials for CORS even if no token
      authReq = req.clone({ withCredentials: true });
    }

    // 2️⃣ Handle response and errors globally
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Descriptive logging
        console.groupCollapsed(`❌ HTTP Error: ${error.status} ${error.statusText}`);
        console.log('URL:', error.url);
        console.log('Method:', req.method);
        console.log('Request Headers:', req.headers);
        console.log('Request Body:', req.body);
        if (error.error) {
          console.log('Error Response Body:', error.error);
        }
        console.log('Full Error Object:', error);
        console.groupEnd();

        // Redirect to unauthorized if 401
        if (error.status === 401) {
          this.router.navigate(['/unauthorized']);
        }

        return throwError(() => error);
      }),
    );
  }
}
