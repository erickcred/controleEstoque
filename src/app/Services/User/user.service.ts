import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthUserRequest } from 'src/app/Models/Interfaces/Auth/IAuthUserRequest';
import { IAuthUserResponse } from 'src/app/Models/Interfaces/Auth/IAuthUserResponse';
import { ISiginUserRequest } from 'src/app/Models/Interfaces/User/ISiginUserRequest';
import { ISiginUserResponse } from 'src/app/Models/Interfaces/User/ISiginUserResponse';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api_url = Environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  singinUser(request: ISiginUserRequest): Observable<ISiginUserResponse> {
    return this.http.post<ISiginUserResponse>(`${this.api_url}/user`, request);
  }

  authUser(request: IAuthUserRequest): Observable<IAuthUserResponse> {
    return this.http.post<IAuthUserResponse>(`${this.api_url}/auth`, request);
  }
}
