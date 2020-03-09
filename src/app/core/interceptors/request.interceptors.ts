import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private lsService: LocalStorageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token
    const token = this.lsService.getValue('token');

    // Set Headers
    if (token) {
      request = request.clone({
        setHeaders: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json; charset=utf-8',
          Authorization: `token ${token}`,
        },
        body: request.body
      });
    } else {
      request = request.clone({
        setHeaders: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json; charset=utf-8',
          // Authorization: `token ${token}`,
        },
        body: request.body
      });
    }


    // Next interceptor
    return next.handle(request);
  }
}