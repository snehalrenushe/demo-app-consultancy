import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserProfile } from './demo-app.model';

@Injectable({
  providedIn: 'root',
})
export class DemoAppService {
  constructor(private http: HttpClient) {}

  onAddUser(
    firstName: string,
    lastName: string,
    email: string,
    contact: string,
    age: number,
    state: string,
    country: string,
    address: string,
    jobs: string[],
    newsletter: boolean,
    profilePhotoPath: string
  ) {
    const data = {
      firstName,
      lastName,
      email,
      contact,
      age,
      state,
      country,
      address,
      jobs,
      newsletter,
      profilePhotoPath,
    };
    
    return this.http.post<any>('http://localhost:3000/userList', data);
  }

  onGetUser() {
    return this.http.get<any>('http://localhost:3000/userList');
  }

  getUserProfile(id: number): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>('http://localhost:3000/userList', {
      params: new HttpParams().append('id', id.toString()),
    });
  }

  onEditUser(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    contact: string,
    age: number,
    state: string,
    country: string,
    address: string,
    jobs: string[],
    newsletter: boolean,
    profilePhotoPath: string
  ) {
    const data = {
      id,
      firstName,
      lastName,
      email,
      contact,
      age,
      state,
      country,
      address,
      jobs,
      newsletter,
      profilePhotoPath,
    };
    return this.http.put('http://localhost:3000/userList/' + id, data);
  }
}
