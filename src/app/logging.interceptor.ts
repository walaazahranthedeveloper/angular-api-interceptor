import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Log the outgoing request
    console.log('Outgoing request:', req);
    return next.handle(req).pipe(
      tap(
        (event) => {
          console.log('Received response:', event);
        },
        error => {
          console.error('Request error:', error);
        }
      )
    );
  }
}