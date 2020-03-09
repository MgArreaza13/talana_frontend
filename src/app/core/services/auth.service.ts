import { User } from './../../shared/models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Authentication } from 'src/app/shared/models/authentication';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(auth: Authentication) {
    return this.http.post(`${ environment.apiRoot }/api/accounts/login/`, auth);
  }


  register(user: User) {
    return this.http.post(`${ environment.apiRoot }/api/accounts/create/`, user);
  }
  
  logout() {
    return this.http.post(`${ environment.apiRoot }/api/accounts/logout/`, {});
  }

//   requestChangePassword(auth: Authentication) {
//     return this.http.post(`${ environment.apiRoot }/auth/request-change-password`, auth);
//   }

//   validateToken(token: string) {
//     return this.http.get(`${ environment.apiRoot }/auth/validate/${ token }`);
//   }

//   changePassword(auth: Authentication) {
//     return this.http.patch(`${ environment.apiRoot }/auth/change-password`, auth);
//   }
}
