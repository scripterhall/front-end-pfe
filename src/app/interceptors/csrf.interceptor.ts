import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, filter, tap } from 'rxjs';
import { AuthentificationService } from '../service/authentification.service';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  constructor() { }
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const uri = request.url;

    if(uri.includes('http://localhost:9999/inscription-service'))
    return next.handle(request)

    if (uri.includes('http://localhost:9999/authentification-service/auth/login')){
      const csrfToken = sessionStorage.getItem("X-Csrftoken")
      console.log("csrf : ", csrfToken);
      const authRequest = request.clone({
        setHeaders: {
          "X-Csrftoken": csrfToken
        }
      });
      return next.handle(authRequest);
    } else {
      return next.handle(request)
    }
  }

}
