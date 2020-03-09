import { User } from '../../shared/models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pet } from 'src/app/shared/models/pet';

@Injectable()
export class PetService {
  constructor(private http: HttpClient) {}

  get_list() {
    return this.http.get(`${ environment.apiRoot }/api/pets/list/`);
  }


  create(pet: Pet) {
    return this.http.post(`${ environment.apiRoot }/api/pets/new/`, pet);
  }


  update(id: number, pet: Pet) {
    return this.http.put(`${ environment.apiRoot }/api/pets/edit/${id}/`, pet);
  }

  delete(id: number) {
    return this.http.delete(`${ environment.apiRoot }/api/pets/delete/${id}/`);
  }
  

  like(id: number) {
    return this.http.get(`${ environment.apiRoot }/api/pets/update-like/${id}/`);
  }


}
