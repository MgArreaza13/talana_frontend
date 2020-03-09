import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  getValue(key: string) {
    return localStorage.getItem(key);
  }

  setValue(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  decodeToken() {
    const jwt = this.getValue('token');
    const jwtData = jwt.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData;
  }

  clearStorage() {
    localStorage.clear();
  }
}
